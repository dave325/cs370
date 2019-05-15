const cheerio = require('cheerio')
const request = require('request')
const fs = require('fs')
const url = "";
const method = "";

const options = {
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
            let $ = cheerio.load(body);
            
            let json = [];
            
            $('tr').each(function(i, elem) {
                if(i > 0){    
                    let name = $(this).children('td:nth-child(1)').text().trim()
                    let email = $(this).children('td:nth-child(2)').text().trim()
                    let url = $(this).children('td:nth-child(3)').text().trim()
                    
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
        let $ = cheerio.load(html);

        let json = [];
    

        $('tr').each(function(i, elem) {
            if(i > 0){    
                let name = $(this).children('td:nth-child(1)').text().trim()
                let email = $(this).children('td:nth-child(2)').text().trim()
                let url = $(this).children('td:nth-child(3)').text().trim()
                
                json.push({"name": name, "email" : email, "url" : url});
            }
    
        });
        
        res.json(json).status(200)
        return JSON.stringify(json);
    });
}