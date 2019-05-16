var  cheerio = require('cheerio');
var  request = require('request');
var  URL = "http://bonnet19.cs.qc.edu:7778/pls/forum/ec_forum.access_check";

module.exports.login = (req, response) => {
    request({ method: 'POST', url: URL, form: { p_usr_username: req.body.p_usr_username, p_usr_password: req.body.p_usr_password} },
    (err, res, body) => {
        if (err) return console.error(err);

        var $ = cheerio.load(body);

        var object = {};
        
        $('INPUT').each(function (i, e) {
            
            if ($(this).attr('name')) {
                
                object[$(this).attr('name')] = $(this).attr('value');
                //console.log($(this).attr('value'));
                if ($(this).attr('NAME') == "p_community") {
                    object["p_community"] = $(this).attr('value');
                } else if ($(this).attr('NAME') == "p_session") {
                    object["p_session"] = $(this).attr('value');
                }
            }
        })
        console.log(JSON.stringify(object));
        return object;
    });
}
