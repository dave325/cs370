var  request = require('request');
var  cheerio = require('cheerio');

/**
REQUIRED: None of these fields can be empty: 
	- Last name; 
	- First name; 
	- Email; 
	- Username; 
	- Password; 
	- Community; 
	- Category of profession.
 */
module.exports.register = (req, res) => {
    request({
        url: "http://bonnet19.cs.qc.cuny.edu:7778/pls/forum/ec_admin.guest_registerDispatch",
        method: "POST",
        form: {
            p_usr_lname: req.body.p_usr_lname ,
            p_usr_fname: req.body.p_usr_fname ,
            p_usr_username: req.body.p_usr_username ,
            p_usr_password: req.body.p_usr_password ,
            p_usr_password2: req.body.p_usr_password2 ,
            p_usr_community: req.body.p_usr_community ,
            p_community_pin: req.body.p_community_pin ,
            p_usr_email: req.body.p_usr_email ,
            p_usr_title: req.body.p_usr_title ,
            p_usr_jobtitle: req.body.p_usr_jobtitle ,
            p_usr_flag: req.body.p_usr_flag ,
            p_usr_company: req.body.p_usr_company ,
            p_usr_contact: req.body.p_usr_contact ,
            p_usr_role: req.body.p_usr_role ,
            p_usr_street1: req.body.p_usr_street1 ,
            p_usr_street2: req.body.p_usr_street2 ,
            p_usr_apt: req.body.p_usr_apt ,
            p_usr_city: req.body.p_usr_city ,
            p_usr_state: req.body.p_usr_state ,
            p_usr_state_symbol: req.body.p_usr_state_symbol ,
            p_usr_postal_cd: req.body.p_usr_postal_cd ,
            p_usr_country: req.body.p_usr_country ,
            p_usr_country_code_p: req.body.p_usr_country_code_p ,
            p_usr_area_code_p: req.body.p_usr_area_code_p ,
            p_usr_phone: req.body.p_usr_phone ,
            p_usr_country_code_f: req.body.p_usr_country_code_f ,
            p_usr_area_code_f: req.body.p_usr_area_code_f ,
            p_usr_fax: req.body.p_usr_fax ,
            p_usr_url: req.body.p_usr_email 
        }
    }, (error, response, body) => {
        var $ = cheerio.load(body);
        
        var msg = $('p').text();
        if(error){
            res.json({"request_status" : "fail"}).status(200);
        }else if(msg.includes("Operation Successfully Completed!")){
            var json = {
                "request_status" : "success",
                "user_creation" : "success"
            }
            res.json(json).status(200);

        }else{
            var json = {
                "request_status" : "success",
                "user_creation" : "fail",
                "error" : body
            }
            res.json(json).status(200);

        }
    });
}
