var  cheerio = require('cheerio');
var  request = require('request');
var  URL = "http://bonnet19.cs.qc.edu:7778/pls/forum/EC_forum.send_interface";

module.exports.caseCreate = (req, res) => {
    request({ method: 'POST', url: URL, form: {p_usr_username: req.body.p_usr_username, p_usr_password: req.body.p_usr_password}},
        (err, response, body) => {
            if (err) return console.error(error);

            var object = {}
            var $ = cheerio.load(body);

            console.log(body)

            object["form-action"] = $("link").attr('href');

            object["title"] = $("title").text();

            object['body-background'] = $('body').attr('background');

            object['select-name'] = $('select').attr('name');

            $('option').each(function (i, e) {
                object[$(this).text().trim() + "-value"] = $(this).attr('value');
            })
            $('p').each(function (i, e) {
                if ($(this).text().trim() == "Subject:") {
                    object['subject'] = $(this).find('input').attr('name');
                } else if ($(this).text().trim() == "Keyword list:") {
                    object['keyword-list'] = $(this).find('input').attr('name');
                } else if ($(this).text().trim() == "Additional details (if any) at URL") {
                    object['details-url'] = $(this).find('input').attr('name');
                } else if ($(this).text().trim().substring(0, 4) == 'Date') {
                    console.log($(this).text().trim().substring(6, 18).trim());
                    object['date'] = $(this).text().trim().substring(6, 18).trim();
                }
            })
            $('input').each(function (i,e){
                if($(this).attr('type') == "hidden"){
                    object[$(this).attr('name')] = $(this).attr('value');
                }
            })

            
            object['descripition-text'] = $('textarea').attr('name');
            res.json(object).status(200);
            
        });
}