var  cheerio = require('cheerio')
var  request = require('request')
var  fs = require('fs')
var  url = "http://bonnet19.cs.qc.cuny.edu";
var  method = "7778";

var  options = {
    url: url,
    method: method,
    path: '/pls/forum/ec_forum.find_cases_by_keyword'
    /*
    header: {
        ...
    }
    */
};
var json = [];

module.exports.SearchResult = (req, res) => {
    //using 'List of threaded cases posted in your (selected Special Interest Groups and) community'
    request({
        url: "http://bonnet19.cs.qc.cuny.edu:7778/pls/forum/ec_forum.retrieve_case_relay",
        method: "POST",
       // path: '/pls/forum/ec_forum.find_cases_by_name',
        form: {
            p_usr_choice: req.body.p_usr_choice,
            p_session_id: req.body.p_session_id
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
                    
                    temp.push(obj);
                }
        
            });
            json.push(temp);
            res.json(json).status(200);
           // return JSON.stringify(json);
        }
        return null;
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