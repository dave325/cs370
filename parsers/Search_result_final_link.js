var cheerio = require('cheerio')
var request = require('request')
var fs = require('fs')
var url = "http://bonnet19.cs.qc.cuny.edu";
var method = "7778";
var path = require("path")
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
                p_media_select: req.body.p_media_select,
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
                p_media_select: "",
                p_attach_ole: "None",
                p_attach_video: "None",
                p_attach_audio: "None",
                p_attach_image: "None",
                p_group_id: "",
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
    if (formOptions === null) {
        res.json({ error: "You do not have the right information" }).status(400);
        return;
    }
    //formOptions.p_community = req.body.p_community_id;
    request({
        url: "http://bonnet19.cs.qc.cuny.edu:7778/pls/forum/ec_forum.action_interface",
        method: "POST",
        // path: '/pls/forum/ec_forum.find_cases_by_name',
        form: formOptions
    }, (error, response, body) => {
        if (error) {
            console.log(err);
        } else {
            console.log(formOptions)
            if (formOptions.p_attachOrReply === "Get-attachment") {
                console.log(body);
                return;
                var temp = fs.createWriteStream("file.pptx");
                request
                    .get("http://bonnet19.cs.qc.cuny.edu:7778/EC_dropoff/4849ole16m4y19547.pptx")
                    .on('response', function (file) {
                        console.log(file) // 200
                        console.log(file.headers) // 'image/png'
                        var filename = "33.jpg";
                        //var stat = fs.statSync("http://bonnet19.cs.qc.cuny.edu:7778/EC_dropoff/4849ole16m4y19547.pptx");
                        //var fileToSend = fs.readFileSync("http://bonnet19.cs.qc.cuny.edu:7778/EC_dropoff/4849ole16m4y19547.pptx");
                        res.set('Content-Type', file.headers['content-type']);
                        //res.set('Content-Length', stat.size);
                        //res.set('Content-Disposition', filename);
                        file.pipe(temp);
                        temp.on('finish', function () {
                            temp.close(function () {
                                //var newFile = fs.createReadStream('file.pptx');
                                var newFile = path.join(__dirname, "../", "file.pptx");
                                res.download('file.pptx', function(resFile){
                                    if(resFile){
                                        console.log(resFile);
                                        res.json(resFile).status(500);
                                        return;
                                    }
                                    fs.unlink(newFile);
                                    return;
                                });

                                return;
                            });  // close() is async, call cb after close completes.
                        });
                    })
                    .on('error', function (fileErr) {
                        console.log(fileErr)
                        return;
                    });
                //fs.unlink('file.pptx');
                return;
            }
            var $ = cheerio.load(body);
            var title = $('TITLE').text();
            if (title === "404 Not Found") {
                res.json({ error: "Route does not exist" }).status(400);
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


