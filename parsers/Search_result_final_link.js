var cheerio = require('cheerio')
var request = require('request')
var fs = require('fs')
var url = "http://bonnet19.cs.qc.cuny.edu";
var method = "7778";

/**
 * contains download link. 
 */

var options = {
    url: url,
    method: method
    /*
    header: {
        ...
    }
    */
};


module.exports.SearchResultFileLink = (req, res) => {
    //using 'List of threaded cases posted in your (selected Special Interest Groups and) community'
    var formOptions;
    switch (req.body.p_attachOrReply) {
        case "Get-attachment":
            formOptions = {
                p_media_select: req.body.p_media_selec,
                p_attach_ole: req.body.p_attach_ole,
                p_ses: req.body.p_session_id,
                p_case_id: req.body.p_case_id,
                p_attachOrReply: req.body.p_attachOrReply
            }
            break;
        case "Reply":
            formOptions = {
                p_ses: req.body.p_session_id,
                p_case_id: req.body.p_case_id,
                p_attachOrReply: req.body.p_attachOrReply
            }
            break;
        case "Bookmark case":
            formOptions = {
                p_group_id: req.body.p_group_id,
                p_ses: req.body.p_session_id,
                p_case_id: req.body.p_case_id,
                p_attachOrReply: req.body.p_attachOrReply
            }
            break;
        case "Add user to my hotlist":
            formOptions = {
                p_ses: req.body.p_session_id,
                p_case_id: req.body.p_case_id,
                p_attachOrReply: req.body.p_attachOrReply
            }
            break;
        case "Create my new resource group":
            formOptions = {
                p_ses: req.body.p_session_id,
                p_case_id: req.body.p_case_id,
                p_attachOrReply: req.body.p_attachOrReply
            }
            break;
        case "Send-Rating":
            formOptions = {
                p_rating_quality: req.body.p_rating_quality,
                p_rating_level: req.body.p_rating_level,
                p_ses: req.body.p_session_id,
                p_case_id: req.body.p_case_id,
                p_attachOrReply: req.body.p_attachOrReply
            }
            break;
        default:
            formOptions = null;
            break;
    } 
    if(formOptions === null){
        res.json({error: "You do not have the right information"}).status(400);
        return;
    }
    formOptions.p_community = req.body.p_community_id;
    request({
        url: "http://bonnet19.cs.qc.cuny.edu:7778/pls/forum/ec_forum.action_interface",
        method: "POST",
        // path: '/pls/forum/ec_forum.find_cases_by_name',
        form: formOptions
    }, (error, response, body) => {
        if (error) {
            console.log(err);
        } else {
            console.log(body);
            console.log(response);
            console.log(req.body)
            console.log(formOptions)
            var $ = cheerio.load(body);
            var title = $('TITLE').text();
            if (title === "404 Not Found"){
                res.json({error: "Route does not exist"}).status(400);
                return;
            }
            var link = $('b').find('a').attr('href');
            var json = {
                "download_link": link
            };
            res.json(json).status(200);
        }

    });
}


