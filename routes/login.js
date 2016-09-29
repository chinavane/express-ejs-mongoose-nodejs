var express = require('express');
var router = express.Router();

var userinfoModel = require('../db/models/UserinfoModel');
var db = require('../db/db');

router.get('/', function(req, res, next) {
	var username = req.session.user?req.session.user.username:'';
	res.render('login',{title:'上帝入口',user:username});
});

router.post('/', function(req, res, next) {
	console.log('-------------');
	var userInfoModel = userinfoModel.userInfoModel;
	// req.session.user={name:'jack'};
	var usercode = req.body.usercode;
	var password = req.body.password;
	console.log(usercode);
	console.log(password);
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
			console.log(doc);
			console.log('userinfo is :'+ doc[0]);
			
			// res.redirect('http://www.baidu.com');
			
			// res.writeHead(301, {'location': 'http://www.baidu.com'});
			// res.redirect('/');
			// console.log('/');
			// res.end();
			
			// res.render('index',{title:'首页'});
			if(doc.length != 0){
				console.log('there is a user.');
				req.session.user=doc[0];
				// res.writeHead(301, {'location': '/'});
				// res.end();
				res.send({'redirect':'/'});
				// res.render('index',{title:'首页'});
			}
			else{
				console.log('there is no such user.');
				res.json({errors:'无此用户'});
			}
			
		}
	});
	

});

module.exports = router;