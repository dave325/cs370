var express = require('express');
var router = express.Router();
var http = require('http');

var  bonnett_port = 7778;
var  bonnett_host = '/bonnet19.cs.qc.cuny.edu';
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
