var  cheerio = require('cheerio');
var  request = require('request');
var  URL = "http://bonnet19.cs.qc.cuny.edu:7778/pls/forum/EC_forum.add_attachment";

module.exports.fileDescription = (req, res) => {
    request({ method: 'POST', url: URL, form: {p_ses:req.body.p_ses, p_case:req.body.p_case, p_owner_name: req.body.p_owner_name}},
        (err, response, body) => {
            if (err) return res.json({error:err}).status(401);
            
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