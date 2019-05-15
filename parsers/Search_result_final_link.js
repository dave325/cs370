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


module.exports.SearchResultFileLink = (req, response) => {
    //using 'List of threaded cases posted in your (selected Special Interest Groups and) community'
    request(options, (error, response, body) => {
        if (error) {
            console.log(`error requesting ${url}`);
        } else {
            let $ = cheerio.load(body);
            let json =  {
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
        let $ = cheerio.load(html);
        
        let json =  {
            "download_link" : $('b a').attr('href')
        };

        
        res.json(json).status(200)
        return JSON.stringify(json);
    })
}