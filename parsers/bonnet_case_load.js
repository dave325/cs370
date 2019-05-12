const cheerio = require('cheerio');
const request = require('request');
const URL = "http://localhost:8080";

request({method: 'GET',url: URL}, 
    (err, res, body) => {
        if (err) return console.error(err);
        
        let $ = cheerio.load(body);
        let object = {};
        object["form-action"] = $("link").attr('href');
        
        object["title"] = $("title").text();
        
        object['body-background'] = $('body').attr('background');

        $('input').each(function(index, e){
            if($(this).attr('name')){
                object[$(this).attr('name')] = $(this).attr('value');
            }else{
                object['submit'] = $(this).attr('value');
            }
            
        })

        //console.log(JSON.stringify(object));
        return object;
});
