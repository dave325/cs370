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
let json = [];

module.exports.SearchResult = (req, response) => {
    //using 'List of threaded cases posted in your (selected Special Interest Groups and) community'
    request(options, (error, response, body) => {
        if (error) {
            console.log(`error requesting ${url}`);
        } else {
            let $ = cheerio.load(body);

            let p_session = $('form input').attr('value');
            json.push({"p_session" : p_session });
        
            $('tr').each(function(i, elem) {
                if(i > 0){    
                    let getCase_value= $(this).children('td:nth-child(1)').children('input').attr('value');
                    let date = $(this).children('td:nth-child(2)').text().trim();
                    let author = $(this).children('td:nth-child(3)').text().trim();
                    let subject = $(this).children('td:nth-child(4)').text().trim();
                    
                    let obj = {
                        "GetCase" : getCase_value,
                        "Date" : date,
                        "Author" : author,
                        "Subject" : subject
                    };
        
                    json.push(obj);
                }
        
            });
            return JSON.stringify(json);
        }
        return null;
    });
}


module.exports.test = (req, res) => {
    fs.readFile(__dirname + '/Raw Html/search by key word.html', 'utf8', (err, html) => {
        console.log(err);
        let $ = cheerio.load(html);
        let p_session = $('form input').attr('value');
        json.push({"p_session" : p_session });
    
        $('tr').each(function(i, elem) {
            if(i > 0){    
                let getCase_value= $(this).children('td:nth-child(1)').children('input').attr('value');
                let date = $(this).children('td:nth-child(2)').text().trim();
                let author = $(this).children('td:nth-child(3)').text().trim();
                let subject = $(this).children('td:nth-child(4)').text().trim();
                
                let obj = {
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