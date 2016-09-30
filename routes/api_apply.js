var express = require('express');
var router = express.Router();
var rsaGenKeys = require('../utility/nodersa');

var rsaKeysModel = require('../db/models/RSAKeysModel');
var db = require('../db/db');

router.get('/', function(req, res, next) {

	var username = req.session.user?req.session.user.username:'';
	res.render('api_apply',{title:'API申请',user:username});
});

// 申请api
router.post('/', function(req, res, next) {

	var keys = rsaGenKeys.RSAGenKeys();
	
	// console.log(req.session.user);
	keys.applyer = req.session.user._id;
	console.log(keys);
	// 保存到数据库
	rsaKeysModel.rsaKeysModel.create(keys,function(err,doc){
		// 待完善
		console.log(doc);
	});
	res.json(keys);
});

module.exports = router;