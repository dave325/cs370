var  cheerio = require('cheerio');
var  request = require('request');
var  URL = "http://bonnet19.cs.qc.cuny.edu:7778/pls/forum/EC_forum.send_dispatch";

module.exports.caseLoad = (req, res) => {
    request({ method: 'POST', url: URL, form: {p_ses: req.body.p_ses, p_sig: req.body.p_sig, p_subject: req.body.p_subject,
        p_keyword: req.body.p_keyword, p_url: req.body.p_url, p_text: req.body.p_text}},//p_sig: 209 to 215
        (err, response, body) => {
            if (err) return res.json({error:"message"}).status(401);

            var $ = cheerio.load(body);
            var object = {};
            object["form-action"] = $("link").attr('href');

            object["title"] = $("title").text();

            object['body-background'] = $('body').attr('background');

            $('input').each(function (index, e) {
                if ($(this).attr('name')) {
                    object[$(this).attr('name')] = $(this).attr('value');
                } else {
                    object['submit'] = $(this).attr('value');
                }

            })

            res.json(object).status(200);
            
        }
    );
}