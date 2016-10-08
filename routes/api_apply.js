var express = require('express');
var router = express.Router();
var rsaGenKeys = require('../utility/nodersa');

var rsaKeysModel = require('../db/models/RSAKeysModel');
var db = require('../db/db');

router.get('/', function(req, res, next) {

	var username = req.session.user?req.session.user.username:'';
	rsaKeysModel.rsaKeysModel.find().populate({
		path:'userinfo',
		match:{usercode:req.session.user.usercode}
	}).exec(function(err,doc){
		console.log(doc);
		res.render('api_apply',{title:'API申请',user:username,privkey:doc[0].privkey,pubkey:doc[0].pubkey});
	});

	
});

// 申请api
router.post('/', function(req, res, next) {

	var keys = rsaGenKeys.RSAGenKeys();
	
	// console.log(req.session.user);
	keys.applyer = req.session.user._id;
	// console.log(keys);
	// 保存到数据库

	rsaKeysModel.rsaKeysModel.find().populate({
		path:'userinfo',
		match:{usercode:req.session.user.usercode}
	}).exec(function(err,doc){
		// console.log('查询数据');
		console.log(doc[0]);
		// console.log('----------------');
		// console.log(keys.privkey);
		// console.log(keys.pubkey);
		// console.log('----------------');
		rsaKeysModel.rsaKeysModel.findByIdAndUpdate(doc[0]._id,{privkey:keys.privkey,pubkey:keys.pubkey},function(err,docx){
			if(err){
				console.log('报错了');
				console.log(err);
			}

			res.json(keys);
		});
	});

	// rsaKeysModel.rsaKeysModel.create(keys,function(err,doc){
		
	// 	console.log(doc);
	// 	res.json(keys);
	// });
	
});

module.exports = router;