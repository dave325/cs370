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


module.exports.SearchResultFileLink = (req, res) => {
    //using 'List of threaded cases posted in your (selected Special Interest Groups and) community'
    request({
        url: "http://bonnet19.cs.qc.cuny.edu:7778/pls/forum/ec_forum.action_interface",
        method: "POST",
       // path: '/pls/forum/ec_forum.find_cases_by_name',
        form: {
            p_media_select: "ole",
            p_attach_ole: req.body.p_attach_ole,
            p_ses : req.body.p_ses,
            p_case_id: req.body.p_case_id
        }}, (error, response, body) => {
        if (error) {
            console.log(err);
        } else {
            
            var $ = cheerio.load(body);
            var link = $('b').find('a').attr('href');
            var json =  {
                "download_link" : link
            };
            res.json(json).status(200);
        }
        
    });
}


