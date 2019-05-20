var express = require('express');
var router = express.Router();
var http = require('http');
var caseReport = require('../parsers/bonnet_case_report_parse');
var caseLoad = require('../parsers/bonnet_case_load_parse');
var caseCreate = require('../parsers/bonnet_create_case_parse');
var login = require('../parsers/bonnet_login_parse');
var fileDescription = require('../parsers/file_desc_parse');
var attachment = require('../parsers/send_attachment_parse');
var submissionConfirm = require('../parsers/file_submission_confirm_parse');
//delete later
//var threadCase = require('../parsers/parseThreadedCase');
//Search
var SearchByKeyWord = require('../parsers/Search_By_keyword');
var SearchByDate = require('../parsers/Search_By_date');
var SearchByCaseNumber = require('../parsers/Search_By_case_number');
var SearchByName = require('../parsers/Search_By_name');
var SearchByGroup = require('../parsers/Search_By_group');
var SearchResultFileLink = require('../parsers/Search_result_final_link');
//
var UserRegister = require('../parsers/bonnet_user_register');
//delete later
//var SearchResult = require('../parsers/Search_result');
//
var CommunityUserList = require('../parsers/searchAllUserersInACommunity');


var bonnett_port = 7778;
var bonnett_host = 'bonnet19.cs.qc.cuny.edu';
express().use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
/** 
 * upload route
*/
router.post('/caseFileDesc', fileDescription.fileDescription);
router.post('/caseload', caseLoad.caseLoad);  
router.post('/caseCreate', caseCreate.caseCreate);
router.post('/caseAttachment', attachment.SendAttachment);
router.post('/caseAttachConfirm', submissionConfirm.confirm);

router.post('/case', caseReport.caseCreate); 
router.post('/login', login.login);
//router.post('/threadCase', threadCase.threadCase);
//router.post('/test', caseReport.test)
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
router.post('/search/group', SearchByGroup.SearchResult);

//Sign up
router.post('/register', UserRegister.register);
//
//router.post('/SearchResult', SearchResult.test);

//
router.post('/SearchResultFile', SearchResultFileLink.SearchResultFileLink);

//user list
router.post('/CommunityUserList', CommunityUserList.list);





module.exports = router;
