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


module.exports.threadCase = (req, response) => {
    //using 'List of threaded cases posted in your (selected Special Interest Groups and) community'
    request(options, (error, response, body) => {
        if (error) {
            console.log(`error requesting ${url}`);
        } else {
            let $ = cheerio.load(body);
            //Form 
            let form_action = $('form').attr('action');
            let method = $('form').attr('method');

            //Hidden
            let name = $('form input').attr('name');
            let value = $('form input').attr('value');


            //table: 
            let get_case = $('tr:nth-child(2) td:nth-child(1) input').attr('value');
            let date = $('tr:nth-child(2) td:nth-child(2)').text();
            let author = $('tr:nth-child(2) td:nth-child(3)').text();
            let subject = $('tr:nth-child(2) td:nth-child(4)').text();

            let json = {
                "form_action": form_action,
                "method": method,
                "hidden_input":
                {
                    "name": name,
                    "value": value
                },
                "table":
                {
                    "get_case": get_case,
                    "date": date,
                    "author": author,
                    "subject": subject
                }
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
        //Form 
        let form_action = $('form').attr('action');
        let method = $('form').attr('method');

        //Hidden
        let name = $('form input').attr('name');
        let value = $('form input').attr('value');


        //table: 
        let get_case = $('tr:nth-child(2) td:nth-child(1) input').attr('value');
        let date = $('tr:nth-child(2) td:nth-child(2)').text();
        let author = $('tr:nth-child(2) td:nth-child(3)').text();
        let subject = $('tr:nth-child(2) td:nth-child(4)').text();

        let json = {
            "form_action": form_action,
            "method": method,
            "hidden_input":
            {
                "name": name,
                "value": value
            },
            "table":
            {
                "get_case": get_case,
                "date": date,
                "author": author,
                "subject": subject
            }
        };
        res.json(json).status(200)
        return JSON.stringify(json);
    })
}