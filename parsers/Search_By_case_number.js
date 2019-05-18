var  cheerio = require('cheerio')
var  request = require('request')
var  fs = require('fs')

var  url = "http://bonnet19.cs.qc.cuny.edu";
var  method = "7778";
// 5992


var object = {};

module.exports.SearchResult = (req, res) => {
    //using 'List of threaded cases posted in your (selected Special Interest Groups and) community'
    request({
        url: "http://bonnet19.cs.qc.cuny.edu:7778/pls/forum/ec_forum.find_case",
        method: "POST",
        form: {
            p_case_select: req.body.case_id,
            p_session: req.body.p_session_id,
            p_community : req.body.p_community
        }
    }, (error, response, body) => {
        if (error) {
            console.log(err);
        } else {
            console.log(body);
            var $ = cheerio.load(body);

   
            object["form-action"] = $("form").attr('action');
        
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
        
                } else if ($(this).find('a').text() == "Bon Sy.") {
                    object["mailto link"] = $(this).find('a').attr('href');
                } else {
                    var type = $(this).find('input').attr('value');
                    if ((type == "img") ||
                        (type == "aud") ||
                        (type == "vid") ||
                        (type == "ole")) {
                        $(this).find('option').each(function (i, e) {
                            object[type + "" + i] = $(this).attr('value');
                            //download file
                        })
        
                    }
                }
            });
        
            $('input').each(function (i, e) {
                if ($(this).attr('name') == "p_case_id") {
                    object["p_case_id"] = $(this).attr("value");
                } else if ($(this).attr("name") == "p_ses") {
                    object["p_ses"] = $(this).attr("value");
                }
        
            })
            res.json(object).status(200);
        }
    });
}


module.exports.test = (req, res) => {
    fs.readFile(__dirname + '/Raw Html/search by key word.html', 'utf8', (err, html) => {
        console.log(err);
        var $ = cheerio.load(html);
        var p_session = $('form input').attr('value');
        json.push({"p_session" : p_session });
    
        $('tr').each(function(i, elem) {
            if(i > 0){    
                var getCase_value= $(this).children('td:nth-child(1)').children('input').attr('value');
                var date = $(this).children('td:nth-child(2)').text().trim();
                var author = $(this).children('td:nth-child(3)').text().trim();
                var subject = $(this).children('td:nth-child(4)').text().trim();
                
                var obj = {
                    "GetCase" : getCase_value,
                    "Date" : date,
                    "Author" : author,
                    "Subject" : subject
                };
    
                json.push(obj);
            }
    
        });

        console.log(json);
        res.json(json).status(200)
        return JSON.stringify(json);
    })
}