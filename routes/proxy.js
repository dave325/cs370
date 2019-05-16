var express = require('express');
var router = express.Router();
var http = require('http');
var caseReport = require('../parsers/bonnet_case_report_parse');
var caseLoad = require('../parsers/bonnet_case_load_parse');
var caseCreate = require('../parsers/bonnet_create_case_parse');
var login = require('../parsers/bonnet_login_parse');
//delete later
var threadCase = require('../parsers/parseThreadedCase');
//Search
var  SearchByKeyWord = require('../parsers/Search_By_keyword');
var  SearchByDate = require('../parsers/Search_By_date');
var  SearchByCaseNumber = require('../parsers/Search_By_case_number');
var  SearchByName = require('../parsers/Search_By_name');
var  SearchResultFileLink = require('../parsers/Search_result_final_link');
//delete later
var  SearchResult = require('../parsers/Search_result');
//
var  CommunityUserList = require('../parsers/List_of_users_in_community');


var  bonnett_port = 7778;
var  bonnett_host = 'bonnet19.cs.qc.cuny.edu';
router.post("/login",

  (req, res) => {

    console.log("LOGIN REQUEST RECIEVED");


    var postData = "p_usr_username=" + req.body.p_usr_username + "&" + "p_usr_password=" + req.body.p_usr_password;

    console.log("The Query String is: " + postData);
    var options = {
      host: bonnett_host,
      port: bonnett_port,
      path: '/pls/forum/ec_forum.access_check',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    var reqToBonnett = http.request(options,
      (response) => {
        htmlResponse = "";
        htmlResponse += "<h1>THIS IS THE RETURNED RESPONSE FROM DEEPAK'S SERVER</h1>";

        response.setEncoding('utf8');
        response.on('data', function (chunk) {
          htmlResponse += chunk;
        });
        response.on('end', function () {
          res.send(htmlResponse);
        })
      }

    );

    reqToBonnett.write(postData);
    reqToBonnett.end();

  });
router.post('/case', caseReport.caseCreate);
router.post('/caseload', caseLoad.caseLoad);
router.post('/caseCreate', caseCreate.caseCreate);
router.post('/login', login.login);
router.post('/threadCase', threadCase.threadCase);
router.post('/test', caseReport.test)
//threaded might need to delete latter, look at /SearchResult
router.post('/thread-test', threadCase.test)


/**
 * All four Search by ID, name, keyword and date returns 
 * same html, so the following two routes works for all of them
 */
router.post('/search/id', SearchByCaseNumber.SearchResult);
router.post('/search/date', SearchByDate.SearchResult);
router.post('/search/keyword', SearchByKeyWord.SearchResult);
router.post('/search/name', SearchByName.SearchResult);
//
router.post('/SearchResult', SearchResult.test);

router.post('/SearchResultFile', SearchResultFileLink.test);


/**
 * if we end up doing User list
 */
router.post('/CommunityUserList', CommunityUserList.test);


module.exports = router;
