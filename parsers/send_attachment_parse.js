var  cheerio = require('cheerio');
var  request = require('request');
var  URL = "http://bonnet19.cs.qc.cuny.edu:7778/pls/forum/EC_forum.add_attachment_dispatch";

module.exports.SendAttachment = (req, res) => {
    request({ method: 'POST', url: URL, form: {p_ses:req.body.p_ses, p_case: req.body.p_case, p_BFile_type: req.body.p_BFile_type, 
    p_BFile_subject: req.body.p_BFile_subject, p_BFile_caption: req.body.p_BFile_caption}},
        (err, response, body) => {
            if (err) return console.error(err);
            
            var $ = cheerio.load(body);
            var object = {};
            object["form-action"] = $("link").attr('href');

            object["title"] = $("title").text();

            object['body-background'] = $('body').attr('background');

            $('input').each(function (index, e) {
                if ($(this).attr('name')) {
                    object[$(this).attr('name')] = $(this).attr('value');
                } else {
                    object[$(this).attr('type')] = $(this).attr('value');
                }

            })
            res.json(object).status(200);        
        }
    );
}