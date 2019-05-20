var  cheerio = require('cheerio')
var  request = require('request')

var json = [];

module.exports.SearchResult = (req, res) => {
    //using 'List of threaded cases posted in your (selected Special Interest Groups and) community'
    request({
        url: "http://bonnet19.cs.qc.cuny.edu:7778/pls/forum/ec_forum.find_cases_by_keyword",
        method: "POST",
       // path: '/pls/forum/ec_forum.find_cases_by_name',
        form: {
            p_keyword: req.body.p_keyword,
            p_s_choice: req.body.p_s_choice,
            p_session: req.body.p_session_id,
            p_community_id: req.body.p_community_id
        }
    }, (error, response, body) => {
        if (error) {
            console.log(`error requesting ${url}`);
        } else {
            var $ = cheerio.load(body);
            var json = [];
            var p_session = $('form input').attr('value');
            json.push({"p_session" : p_session });
            
            console.log(body);
            var temp = [];
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
            res.json(json).status(200);
           // return JSON.stringify(json);
        }
        return null;
    });
};
