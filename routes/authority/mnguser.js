var express = require('express');
var router = express.Router();
var crypto = require('crypto');// 加密模块
var UserModel = require('../../db/models/UserModel');
var UserRoleModel = require('../../db/models/UserRoleModel');
var RoleModel = require('../../db/models/RoleModel');
var db = require('../../db/db');


router.get('/', function(req, res, next) {

	var username = req.session.user?req.session.user.username:'';
	res.render('authority/mnguser',{title:'管理用户',user:username});
});

router.post('/',function(req,res,next){
	var usercode = req.body.usercode;
	var username = req.body.username;
	var email = req.body.email;
	var birthday = req.body.birthday;
	var gender = req.body.gender;
	var password = req.body.password;
	var roleid = req.body.role;
	var userInfoModel = UserModel.UserModel;
	// 加密
	var sha1 = crypto.createHash('sha1');
	sha1.update(password);
	
	var userinfo = {};
	userinfo.username = username;
	userinfo.email = email;
	userinfo.usercode = usercode;
	userinfo.gender = gender;
	userinfo.birthday = birthday;
	userinfo.password = sha1.digest('hex');
	userinfo.role_id = roleid;
	userinfo.createdby = req.session.user.usercode;

	userInfoModel.findOne({usercode:usercode},function(err,exists){
		if(err){
			var returninfo = "";
			var i = 1;
			for(key in err.errors){
				console.log(err.errors[key].message);
				returninfo += i + '.'+err.errors[key].message+'\n';
				++i;
			}
			res.json({errors:returninfo});
		}
		else{
			if(exists =={} || exists == ''){
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
						// console.log(err.stack());
					}
					else{
						UserModel.UserModel.findUserWithRole(function(err,users){
							//
							if(err){
								var returninfo = "";
								var i = 1;
								for(key in err.errors){
									console.log(err.errors[key].message);
									returninfo += i + '.'+err.errors[key].message+'\n';
									++i;
								}
								res.json({errors:returninfo});
							}
							else{
								// console.log(users);
								res.json(users);
							}
						});
					}
				});
			}
			else{
				res.json({errors:'用户已经存在'});
			}
		}
	});
				
});


// 查询user
router.post('/quser', function(req, res, next) {
	UserModel.UserModel.findUserWithRole(function(err,users){
		//
		if(err){
			var returninfo = "";
			var i = 1;
			for(key in err.errors){
				console.log(err.errors[key].message);
				returninfo += i + '.'+err.errors[key].message+'\n';
				++i;
			}
			res.json({errors:returninfo});
		}
		else{
			// console.log(users);
			res.json(users);
		}
	});
});


module.exports = router;