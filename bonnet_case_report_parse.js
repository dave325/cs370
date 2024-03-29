var  cheerio = require('cheerio');
var  request = require('request');
var  URL = "http://localhost:8080";
var  fs = require('fs')
module.exports.case = (req, response) => {
    request({ method: 'GET', url: URL },
        (err, res, body) => {
            if (err) return console.error(err);
            var  arr = [];
            var object = {}
            var $ = cheerio.load(body);
            object["form-action"] = $("link").attr('href');

            object["title"] = $("title").text();

            object['body-background'] = $('body').attr('background');
            $('b').each(function (index, e) {
                if (!($(this).text().trimRight() == "Q1.")
                    && !($(this).text().trimRight() == "Q2.")
                    && !($(this).text().trimRight() == "Case Description:")) {
                    if (e.next) {
                        var l = $(this).text().trim().length;
                        object[$(this).text().trim().substring(0, l - 1)] = e.next.data.trim();

                    }
                }
            })

            $('p').each(function (index, en) {
                if (($(this).find('b').text().trimRight() == "Case Description:")) {
                    object["Case Description link"] = $(this).find('a').attr('href');
                    object["Case Description"] = $(this).find('td').text();

                } else if ($(this).text().includes("Oracle Y2K compliant system date reporting today as:")) {

                    var l = $(this).text().length;
                    object["compliant system date"] = $(this).text().substring(53, l).trim();
                } else if ($(this).find('a').text() == "Bon Sy.") {
                    object["mailto link"] = $(this).find('a').attr('href');
                } else {
                    var type = $(this).find('input').attr('value');
                    if ((type == "img") ||
                        (type == "aud") ||
                        (type == "vid") ||
                        (type == "ole")) {
                        $(this).find('option').each(function (i, e) {
                            object[type + " " + i] = $(this).attr('value');
                            //download file
                        })

                    }
                }
            })

            //console.log(JSON.stringify(object));
            return object;
        });
}


module.exports.test = (req, res) => {
    fs.readFile(__dirname + '/Raw Html/search by date html.html', 'utf8', (err, html) => {
        console.log(err);
        console.log(html)
    })
}