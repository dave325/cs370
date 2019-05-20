var  cheerio = require('cheerio')
var  request = require('request')

var json = [];

module.exports.SearchResult = (req, res) => {
    request({
        url: "http://bonnet19.cs.qc.cuny.edu:7778/pls/forum/ec_forum.find_cases_by_date",
        method: "POST",
        form: {
            p_increment_date: req.body.p_increment_date,
            p_from_date: req.body.p_from_date,
            p_to_date: req.body.p_to_date,
            p_session: req.body.p_session,
            p_community_id: req.body.p_community_id
        }
    }, (error, response, body) => {
        if (error) {
            console.log(err);
        } else {
            var $ = cheerio.load(body);

            var p_session = $('form input').attr('value');
            json.push({"p_session" : p_session });
            var data = [];
            console.log(body)
            $('tr').each(function(i, elem) {
                //if(i == 1){    
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
        
                    data.push(obj);
                    
                    
                    
                //}
        
            });
            json.push(data);
            res.json(json).status(200);
        }
    });
}

