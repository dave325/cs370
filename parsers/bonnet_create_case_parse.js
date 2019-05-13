const cheerio = require('cheerio');
const request = require('request');
const URL = "http://localhost:8080";

request({method: 'GET',url: URL}, 
    (err, res, body) => {
        if (err) return console.error(err);
        
        let object = {}
        let $ = cheerio.load(body);

        object["form-action"] = $("link").attr('href');
        
        object["title"] = $("title").text();
        
        object['body-background'] = $('body').attr('background');
        
        object['select-name'] = $('select').attr('name');

        $('option').each(function(i, e) {
            object[$(this).text().trim()+"-value"] = $(this).attr('value');
        })
        $('p').each(function(i, e) {
            if($(this).text().trim() == "Subject:"){
                object['subject'] = $(this).find('input').attr('name');
            }else if($(this).text().trim() == "Keyword list:"){
                object['keyword-list'] = $(this).find('input').attr('name');
            }else if($(this).text().trim() == "Additional details (if any) at URL"){
                object['details-url'] = $(this).find('input').attr('name');
            }else if($(this).text().trim().substring(0,4) == 'Date' ){
                console.log($(this).text().trim().substring(6, 18).trim());
                object['date'] = $(this).text().trim().substring(6, 18).trim();
            }
        })
        object['descripition-text'] = $('textarea').attr('name');
        console.log(JSON.stringify(object));
        return object;
});
