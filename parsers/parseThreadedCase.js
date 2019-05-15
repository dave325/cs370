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


module.exports.threadCase = (req, response) => {
    //using 'List of threaded cases posted in your (selected Special Interest Groups and) community'
    request(options, (error, response, body) => {
        if (error) {
            console.log(`error requesting ${url}`);
        } else {
            var $ = cheerio.load(body);
            //Form 
            var form_action = $('form').attr('action');
            var method = $('form').attr('method');

            //Hidden
            var name = $('form input').attr('name');
            var value = $('form input').attr('value');


            //table: 
            var get_case = $('tr:nth-child(2) td:nth-child(1) input').attr('value');
            var date = $('tr:nth-child(2) td:nth-child(2)').text();
            var author = $('tr:nth-child(2) td:nth-child(3)').text();
            var subject = $('tr:nth-child(2) td:nth-child(4)').text();

            var json = {
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
        var $ = cheerio.load(html);
        //Form 
        var form_action = $('form').attr('action');
        var method = $('form').attr('method');

        //Hidden
        var name = $('form input').attr('name');
        var value = $('form input').attr('value');


        //table: 
        var get_case = $('tr:nth-child(2) td:nth-child(1) input').attr('value');
        var date = $('tr:nth-child(2) td:nth-child(2)').text();
        var author = $('tr:nth-child(2) td:nth-child(3)').text();
        var subject = $('tr:nth-child(2) td:nth-child(4)').text();

        var json = {
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