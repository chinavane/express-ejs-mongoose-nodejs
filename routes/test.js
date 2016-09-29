var express = require('express');
var router = express.Router();

var test = require('../db/models/TestModel');
var db = require('../db/db');

/* GET home page. */
router.get('/', function(req, res, next) {
	var testModel = test.testModel;

	// testModel.find({},function(err,docs){
	// 	console.log(docs);
	// 	res.send(docs);
	// });
	res.render('test',{title:'测试功能'});

});


module.exports = router;
