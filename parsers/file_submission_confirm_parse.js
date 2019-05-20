var  cheerio = require('cheerio');
var  request = require('request');
var  URL = "http://bonnet19.cs.qc.edu:8080/ecommunity/SF";

module.exports.SendAttachment = (req, res) => {
    request({ method: 'POST', url: URL, form: {p_usr_id, p_transact1}},
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