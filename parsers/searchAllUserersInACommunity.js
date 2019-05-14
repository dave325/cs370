const cheerio = require('cheerio')
const request = require('request')

const url = "";
const method = "";

const options = {
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


