var  cheerio = require('cheerio')
var  request = require('request')
var  fs = require('fs')
var  url = "";
var  method = "";

var  options = {
    url: url,
    method: method
    /*
    header: {
        ...
    }
    */
};


module.exports.CommunityUsers = (req, response) => {
    //using 'List of threaded cases posted in your (selected Special Interest Groups and) community'
    request(options, (error, response, body) => {
        if (error) {
            console.log(`error requesting ${url}`);
        } else {
            var $ = cheerio.load(body);
            
            var json = [];
            
            $('tr').each(function(i, elem) {
                if(i > 0){    
                    var name = $(this).children('td:nth-child(1)').text().trim()
                    var email = $(this).children('td:nth-child(2)').text().trim()
                    var url = $(this).children('td:nth-child(3)').text().trim()
                    
                    json.push({"name": name, "email" : email, "url" : url});
                }

            });

            return JSON.stringify(json);
        }
        return null;
    });
}


module.exports.test = (req, res) => {
    fs.readFile(__dirname + '/Raw Html/Show All Users in a Community.html', 'utf8', (err, html) => {
        console.log(err);
        var $ = cheerio.load(html);

        var json = [];
    

        $('tr').each(function(i, elem) {
            if(i > 0){    
                var name = $(this).children('td:nth-child(1)').text().trim()
                var email = $(this).children('td:nth-child(2)').text().trim()
                var url = $(this).children('td:nth-child(3)').text().trim()
                
                json.push({"name": name, "email" : email, "url" : url});
            }
    
        });
        
        res.json(json).status(200)
        return JSON.stringify(json);
    });
}