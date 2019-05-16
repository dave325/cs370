var express = require('express');
var router = express.Router();
var http = require('http');
var path = require('path');
var  bonnett_port = 7778;
var  bonnett_host = '/bonnet19.cs.qc.cuny.edu';
/* GET home page. */
router.get('**', function (req, res, next) {
  res.sendFile(path.join(__dirname, "/www/index.html"));
});

module.exports = router;
