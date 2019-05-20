var  cheerio = require('cheerio')
var  request = require('request')
var  fs = require('fs')

var json = [];

module.exports.register = (req, res) => {
    //using 'List of threaded cases posted in your (selected Special Interest Groups and) community'
    request({
        url: "http://bonnet19.cs.qc.cuny.edu:7778/pls/forum/ec_admin.guest_registerDispatch",
        method: "POST",
       // path: '/pls/forum/ec_forum.find_cases_by_name',
        form: {
            //NAME AND PERSONAL INFORMATION
            p_usr_lname : req.body.p_usr_lname ,
            p_usr_fname: req.body.p_usr_fname ,
            p_usr_username: req.body.p_usr_username ,
            p_usr_password: req.body.p_usr_password ,
            p_usr_password2: req.body.p_usr_password2 ,
            p_usr_community: req.body.p_usr_community ,
            p_community_pin: req.body.p_community_pin ,
            p_usr_role: req.body.p_usr_role 
        }
    }, (error, response, body) => {
        console.log(body);


    });
}


module.exports.test = (req, res) => {
    fs.readFile(__dirname + '/Raw Html/search by key word.html', 'utf8', (err, html) => {
        console.log(err);
        var $ = cheerio.load(html);
        var p_session = $('form input').attr('value');
        json.push({"p_session" : p_session });
    
        $('tr').each(function(i, elem) {
            if(i > 0){    
                var getCase_value= $(this).children('td:nth-child(1)').children('input').attr('value');
                var date = $(this).children('td:nth-child(2)').text().trim();
                var author = $(this).children('td:nth-child(3)').text().trim();
                var subject = $(this).children('td:nth-child(4)').text().trim();
                
                var obj = {
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