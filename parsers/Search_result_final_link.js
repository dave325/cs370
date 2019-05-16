var  cheerio = require('cheerio')
var  request = require('request')
var  fs = require('fs')
var  url = "http://bonnet19.cs.qc.cuny.edu";
var  method = "7778";

var  options = {
    url: url,
    method: method
    /*
    header: {
        ...
    }
    */
};


module.exports.SearchResultFileLink = (req, response) => {
    //using 'List of threaded cases posted in your (selected Special Interest Groups and) community'
    request({
        url: "http://bonnet19.cs.qc.cuny.edu:7778/pls/forum/ec_forum.retrieve_interface",
        method: "POST",
       // path: '/pls/forum/ec_forum.find_cases_by_name',
        form: {
            p_case_select: req.body.p_case_select,
            p_session: req.body.p_session
        }}, (error, response, body) => {
        if (error) {
            console.log(err);
        } else {
            var $ = cheerio.load(body);
            var json =  {
                "download_link" : $('b a').attr('href')
            };
            return JSON.stringify(json);
        }
        return null;
    });
}


module.exports.test = (req, res) => {
    fs.readFile(__dirname + '/Raw Html/search by date.html.html', 'utf8', (err, html) => {
        console.log(err);
        var $ = cheerio.load(html);
        
        var json =  {
            "download_link" : $('b a').attr('href')
        };

        
        res.json(json).status(200)
        return JSON.stringify(json);
    })
}