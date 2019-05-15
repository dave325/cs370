var  cheerio = require('cheerio')
var  request = require('request')

var  url = "";
var  method = "";

var  options = {
    url:url,
    method: method 
    /*
    header: {
        ...
    }
    */ 
};


request(options, (error, response, body) => {
    if(error){
        console.log(`error requesting ${url}`);
    }else{
        
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


