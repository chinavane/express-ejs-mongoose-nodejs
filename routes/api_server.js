var express = require('express');
var router = express.Router();

const crypto = require('crypto');
const verify = crypto.createVerify('RSA-SHA1');

var rsaKeysModel = require('../db/models/RSAKeysModel');
var db = require('../db/db');

// api server
router.post('/', function(req, res, next) {
	
	// var username = req.session.user?req.session.user.username:'';
	// res.render('api_desc',{title:'API说明',user:username});

	// 查询公钥
	rsaKeysModel.rsaKeysModel.find().populate({
		path:'userinfo',
		match:{name:'james'}
	}).exec(function(err,doc){
		// console.log(doc);
		// 公钥
		var pubkey = doc[0].pubkey;
		// 验证
		//console.log(req);
		console.log(req.body.api_name);
		console.log(req.body.api_code);
		console.log(req.body.signature);
		// 待验证数据
		var sign_str = 'api_name='+req.body.api_name+'&api_code='+req.body.api_code;
		verify.update(sign_str);
		var verifyResult =  verify.verify(pubkey,req.body.signature,'hex');
		console.log('验证结果：'+verifyResult);
		var verify_Result = {};
		
		// 如果验证通过，处理业务逻辑
		if(verifyResult){
			verify_Result.verifyResult = '返回业务数据或处理结果';
		}
		else{
			// 拒绝服务
			verify_Result.verifyResult = '身份有误，请申请新的密钥';
		}
		res.json(verify_Result);
	});

});

module.exports = router;