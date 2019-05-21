var  cheerio = require('cheerio');
var  request = require('request');
var  URL1 = "http://bonnet19.cs.qc.edu:7778/pls/forum/EC_forum.send_interface";
var  URL2 = "http://bonnet19.cs.qc.cuny.edu:7778/pls/forum/EC_forum.send_dispatch";

module.exports.caseUpload = (req, res) => {
    request({ method: 'POST', url: URL1, form: {p_usr_username: req.body.p_usr_username, p_usr_password: req.body.p_usr_password}},
        (err, response, body) => {
            if (err) return res.json({error: err}).status(401);

            var object1 = {}
            var $ = cheerio.load(body);

            object1["form-action"] = $("link").attr('href');

            object1["title"] = $("title").text();

            object1['body-background'] = $('body').attr('background');

            object1['select-name'] = $('select').attr('name');

            $('option').each(function (i, e) {
                object1[$(this).text().trim() + "-value"] = $(this).attr('value');
            })
            $('p').each(function (i, e) {
                if ($(this).text().trim() == "Subject:") {
                    object1['subject'] = $(this).find('input').attr('name');
                } else if ($(this).text().trim() == "Keyword list:") {
                    object1['keyword-list'] = $(this).find('input').attr('name');
                } else if ($(this).text().trim() == "Additional details (if any) at URL") {
                    object1['details-url'] = $(this).find('input').attr('name');
                } else if ($(this).text().trim().substring(0, 4) == 'Date') {
                    object1['date'] = $(this).text().trim().substring(6, 18).trim();
                }
            })
            $('input').each(function (i,e){
                if($(this).attr('type') == "hidden"){
                    object1[$(this).attr('name')] = $(this).attr('value');
                }
            })

            
            object1['descripition-text'] = $('textarea').attr('name');

            request({ method: 'POST', url: URL2, form: {p_ses: object1.p_ses, p_sig: req.body.p_sig, p_subject: req.body.p_subject,
                p_keyword: req.body.p_keyword, p_url: req.body.p_url, p_text: req.body.p_text}},//p_sig: 209 to 215
                (err, response, body) => {
                    if (err) return res.json({error: "message"}).status(401);
        
                    var $ = cheerio.load(body);
                    var object2 = {};
                    object2["form-action"] = $("link").attr('href');
        
                    object2["title"] = $("title").text();
        
                    object2['body-background'] = $('body').attr('background');
        
                    $('input').each(function (index, e) {
                        if ($(this).attr('name')) {
                            object2[$(this).attr('name')] = $(this).attr('value');
                        } else {
                            object2['submit'] = $(this).attr('value');
                        }
        
                    })
        
                    res.json(object2).status(200);
                    
                }
            );
        }
    );
}