var  cheerio = require('cheerio');
var  request = require('request');
var  URL = "http://localhost:8080";

module.exports.caseLoad = (req, response) => {
    request({ method: 'GET', url: URL },
        (err, res, body) => {
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
                    object['submit'] = $(this).attr('value');
                }

            })

            //console.log(JSON.stringify(object));
            return object;
        });
}