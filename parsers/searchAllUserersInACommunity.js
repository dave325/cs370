var  cheerio = require('cheerio')
var  request = require('request')
var  fs = require('fs')

var json = [];

module.exports.list = (req, res) => {
    //using 'List of threaded cases posted in your (selected Special Interest Groups and) community'
    request({
        url: "hhttp://bonnet19.cs.qc.cuny.edu:7778/pls/forum/ec_admin.show_users_dispatch",
        method: "POST",
        form: {
            p_usr_username: "hona7436",
            p_usr_password: "23327436"
        }
    }, (error, response, body) => {
        if (error) {
            console.log(`error requesting ${url}`);
        } else {
            var $ = cheerio.load(body);
            console.log(body);

            $('tr').each(function(i, elem) {
                if(i > 0){    
                    var name = $(this).children('td:nth-child(1)').text().trim();
                    var email = $(this).children('td:nth-child(2)').text().trim();
                    var url = $(this).children('td:nth-child(3)').text().trim();
                    
                    json.push({"name": name, "email" : email, "url" : url});
                }
    
            });
    

            res.json(json).status(200);
        }
    });
};
   /* 
request(options, (error, response, body) => {
    if(error){
        console.log(err);
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

*/
