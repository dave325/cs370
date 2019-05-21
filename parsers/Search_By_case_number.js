var cheerio = require('cheerio')
var request = require('request')

var object = {};

/**
 * Search by Case ID.
 */
module.exports.SearchResult = (req, res) => {
    request({
        url: "http://bonnet19.cs.qc.cuny.edu:7778/pls/forum/ec_forum.find_case",
        method: "POST",
        form: {
            p_case_select: req.body.p_case_select,
            p_session: req.body.p_session_id,
            p_community: req.body.p_community_id
        }
    }, (error, response, body) => {
        if (error) {
            console.log(err);
        } else {
            console.log(body);
            if (body == "Your selected case does not belong to your community\n") {
                var msg = {
                    error: "Your selected case does not belong to your community"
                }
                res.json(msg).status(200);
                return;
            }
            var $ = cheerio.load(body);


            object["form-action"] = $("form").attr('action');

            object["title"] = $("title").text();


            var case_header = {};
            $('b').each(function (index, e) {
                if (!($(this).text().trimRight() == "Q1.")
                    && !($(this).text().trimRight() == "Q2.")
                    && !($(this).text().trimRight() == "Case Description:")) {
                    if (e.next) {
                        var l = $(this).text().trim().length;
                        case_header[$(this).text().trim().substring(0, l - 1).replace(/ /g, '')] = e.next.data.trim();

                    }
                }
            });

            object["case_header"] = case_header;
            $('p').each(function (index, en) {
                if (($(this).find('b').text().trimRight() == "Case Description:")) {
                    object["about_case"] = {
                        "Case_Description_link": $(this).find('a').attr('href'),
                        "Case_Description": $(this).find('td').text()
                    }
                } else if ($(this).find('a').text() == "Bon Sy.") {
                    object["mailto link"] = $(this).find('a').attr('href');
                } else {
                    var type = $(this).find('input').attr('value');
                    if ((type == "img") ||
                        (type == "aud") ||
                        (type == "vid") ||
                        (type == "ole")) {
                        var option = [];
                        $(this).find('option').each(function (i, e) {
                            if ($(this).attr('value') != "None") {
                                option.push
                                    ({
                                        "value": $(this).attr('value'),
                                        "text": $(this).text()
                                    });
                            }
                        });
                        object["select_radio_options"] = option;

                    }
                }
            })
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

