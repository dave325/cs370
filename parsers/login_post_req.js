const cheerio = require('cheerio');
const request = require('request');
const URL1 = "http://bonnet19.cs.qc.edu:7778/pls/forum/ec_forum.access_check";
const URL2 = "http://bonnet19.cs.qc.edu:7778/pls/forum/ec_forum.find_cases_by_name";
const URL3 = "http://bonnet19.cs.qc.edu:7778/pls/forum/ec_forum.retrieve_interface";
var postData = "p_usr_username=" + "chdo3872" + "&" + "p_usr_password=" + "ehdtn123";

//usernam - req.body.p_usr_username
request({ method: 'POST', url: URL1, form: { p_usr_username: req.body.p_usr_username, p_usr_password: req.body.p_usr_password} },
    (err, res, body) => {
        if (err) return console.error(err);

        var $ = cheerio.load(body);

        let object = {};
        
        $('INPUT').each(function (i, e) {
            
            if ($(this).attr('name')) {
                
                object[$(this).attr('name')] = $(this).attr('value');
                //console.log($(this).attr('value'));
                if ($(this).attr('NAME') == "p_community") {
                    object["p_community"] = $(this).attr('value');
                } else if ($(this).attr('NAME') == "p_session") {
                    object["p_session"] = $(this).attr('value');
                }
            }
        })
        
        console.log(JSON.stringify(object));

        //p_lname and p_fname, p_community_id, p_session
        request({ method: 'POST', url: URL2, form: { p_lname: "sy", p_fname: "", p_community_id: object.p_community_id,
        p_session: object.p_session} },
            (err, res, body) => {
                if (err) return console.error(err);

                var $ = cheerio.load(body);
                let object2 = {};

                let j = 0;
                $('INPUT').each(function (i, e) {
                    if ($(this).attr('name')) {
                        
                        if ($(this).attr('name') == "p_session") {
                            object2["p_session"] = $(this).attr('value');
                        }
                        if ($(this).attr('name') == "p_case_select") {
                            
                            object2['p_case_select' + "" + j] = $(this).attr('value');
                            j++;
                        }
                    }
                });

                console.log(JSON.stringify(object2));        
                //case report
                //p_media_select: "img" or "aud" or "vid" or "ole"
                //p_attachOrReply: "Get-attachment" || "Reply" || "Bookmark case"||"Add user to my hotlist"||"Create my new resource group"
                request({ method: 'POST', url: URL3, form: { p_case_select: object2.p_case_select1, p_session: object2.p_session } }, 
                    (err, res, body) => {
                    if (err) return console.error(err);
        
                    let $ = cheerio.load(body);
                    let object = {};
                    object["form-action"] = $("form").attr('action');
        
                    object["title"] = $("title").text();
        
                    object['body-background'] = $('body').attr('background');
                    $('b').each(function(index, e){
                        if(!($(this).text().trimRight() == "Q1.")
                            &&!($(this).text().trimRight() == "Q2.")
                            &&!($(this).text().trimRight() == "Case Description:")){
                            if(e.next){  
                                let l = $(this).text().trim().length;
                                object[$(this).text().trim().substring(0, l-1)] = e.next.data.trim();
                
                            }
                        }
                    })

                    $('p').each(function(index, en){
                        if(($(this).find('b').text().trimRight() == "Case Description:")){
                            object["Case Description link"] = $(this).find('a').attr('href');
                            object["Case Description"] = $(this).find('td').text();
                
                        }else if($(this).find('a').text() == "Bon Sy."){
                            object["mailto link"] = $(this).find('a').attr('href');
                        }else{
                            let type = $(this).find('input').attr('value');
                            if((type == "img")||
                                (type == "aud")||
                                (type == "vid")||
                                (type == "ole")){
                                $(this).find('option').each(function(i,e){
                                    object[type+""+i] = $(this).attr('value');
                                    //download file
                                })
                
                            }
                        }
                    })

                    $('input').each(function(i,e){
                        if($(this).attr('name') == "p_case_id"){
                            object["p_case_id"] = $(this).attr("value");
                        }else if($(this).attr("name") == "p_ses"){
                            object["p_ses"] = $(this).attr("value");
                        }
            
                    })
        
                    console.log(JSON.stringify(object));
                    return object;
                });
                
            }
        )
        
    });
