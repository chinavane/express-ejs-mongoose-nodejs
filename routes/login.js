var express = require('express');
var router = express.Router();
var crypto = require('crypto');// 加密模块

var userinfoModel = require('../db/models/UserModel');
var db = require('../db/db');

router.get('/', function(req, res, next) {
	var username = req.session.user?req.session.user.username:'';
	console.log(username);
	res.render('login',{title:'上帝入口',user:username});
});

router.post('/', function(req, res, next) {
	// console.log('-------------');
	var userInfoModel = userinfoModel.UserModel;
	// req.session.user={name:'jack'};
	var usercode = req.body.usercode;
	var password = req.body.password;
	// console.log(usercode);
	// console.log(password);

	// 加密
	var sha1 = crypto.createHash('sha1');
	sha1.update(password);
	password = sha1.digest('hex');
	

	userInfoModel.find({usercode:usercode,password:password}).exec(function(err,doc){
		if(err){
			// 如果出错，返回错误信息
			//throw new Error("save exception!");
			var returninfo = "";
			var i = 1;
			for(key in err.errors){
				console.log(err.errors[key].message);
				returninfo += i + '.'+err.errors[key].message+'\n';
				++i;
			}
			res.json({errors:returninfo});
			console.log(err.stack());
		}
		else{
			if(doc.length != 0){
				// console.log('there is a user.');
				req.session.user=doc[0];
				res.send({'redirect':'/'});
			}
			else{
				console.log('there is no such user.');
				res.json({errors:'无此用户'});
			}
		}
	});
});
// 登出
router.all('/logout', function(req, res, next) {
	req.session.user = null;
	res.redirect('/login');
});
module.exports = router;