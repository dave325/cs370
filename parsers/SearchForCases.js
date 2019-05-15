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


//using Welcome to the Software Engineering PIN #_183 Community!
request(options, (error, response, body) => {
    if(error){
        console.log(err);
    }else{
            
        var $ = cheerio.load(body);
        
        var p_community_id = $('form:nth-of-type(2) input:nth-child(3)').attr('value');

        var p_session = $('form:nth-of-type(2) input:nth-child(4)').attr('value');


        var json = {
            "hidden" : {
                "p_community_id" : p_community_id,
                "p_session" : p_session
            },
            "form_one" : {
                "action" : $('form:nth-of-type(1)').attr('action'),
                "method" : $('form:nth-of-type(1)').attr('method')
            },
            "form_two" : {
                "action" : $('form:nth-of-type(2)').attr('action'),
                "method" : $('form:nth-of-type(2)').attr('method')
            },
            "form_three" : {
                "action" : $('form:nth-of-type(3)').attr('action'),
                "method" : $('form:nth-of-type(3)').attr('method')
            }
        }
        
        return JSON.stringify(json);
    }
    return null;
});

