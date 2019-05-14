const cheerio = require('cheerio');
const request = require('request');
const URL = "http://bonnet19.cs.qc.edu:7778/pls/forum/ec_forum.retrieve_interface";

//case report
//p_media_select: "img" or "aud" or "vid" or "ole"
//p_attachOrReply: "Get-attachment" || "Reply" || "Bookmark case"||"Add user to my hotlist"||"Create my new resource group"
                
request({method: 'GET',url: URL, form: { p_case_select: req.body.p_case_select, p_session: req.body.p_session }}, 
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
