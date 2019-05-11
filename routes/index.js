var express = require('express');
var router = express.Router();
var http = require('http');

const bonnett_port = 7778;
const bonnett_host = 'http://bonnet19.cs.qc.cuny.edu';
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

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

module.exports = router;
