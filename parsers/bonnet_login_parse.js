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
    
        $('tr').each(function(i, e) {
            if($(this).text().trim() == "Username:"){
                object["username_name"] = $(this).find('input').attr('name');
            }else if($(this).text().trim() == "Password:"){
                object["password_name"] = $(this).find('input').attr('name');
            }else{
                
                object["submit_value"] = $(this).find('input').attr('value');
            }
        })
        
        console.log(JSON.stringify(object));
        return object;
});
