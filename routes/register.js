var express = require('express');
var router = express.Router();
var crypto = require('crypto');// 加密模块
var userinfoModel = require('../db/models/UserinfoModel');
var db = require('../db/db');

router.get('/', function(req, res, next) {

	var username = req.session.user?req.session.user.username:'';
	res.render('register',{title:'上帝注册',user:username});

});

router.post('/',function(req,res,next){
	var usercode = req.body.usercode;
	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;
	var userInfoModel = userinfoModel.userInfoModel;
	// 加密
	var sha1 = crypto.createHash('sha1');
	sha1.update(password);
	
	var userinfo = {};
	userinfo.username = username;
	userinfo.email = email;
	userinfo.usercode = usercode;
	userinfo.password = sha1.digest('hex');

	userInfoModel.create(userinfo,function(err,doc){
		if(err){
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

			console.log(doc);
			req.session.user = doc;
			res.send({'redirect':'/'});
		}
	});
});
module.exports = router;
