var express = require('express');
var router = express.Router();

var RoleModel = require('../../db/models/RoleModel');
var RoleMenuModel = require('../../db/models/RoleMenuModel');
var MenuModel = require('../../db/models/MenuModel');
var db = require('../../db/db');

router.get('/', function(req, res, next) {

	var username = req.session.user?req.session.user.username:'';
	res.render('authority/mngrole',{title:'管理角色',user:username});
});

// 查询roles
router.post('/qrole', function(req, res, next) {
	RoleModel.RoleModel.find({},function(err,roles){
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
			res.json(roles);
		}
	});
});

// 查询rolesmenu
router.post('/qrolemenu', function(req, res, next) {
	var roleid = req.body.rid;
	// console.log(roleid);
	RoleMenuModel.RoleMenuModel.find({role_id:roleid},function(err,rolemenu){
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
			//res.json(rolemenu);
			// console.log(rolemenu);
			var ids = [];
			for(var i = 0 ; i < rolemenu.length ; i ++){
				ids.push(rolemenu[i].menu_id);
			}
			// console.log(ids);
			MenuModel.MenuModel.find({_id:{$in:ids}},function(err,menus){

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
					// console.log(menus);
					res.json(menus);
				}
			});
		}
	});
});



// 查询rolesmenuUnauth
router.post('/qrolemenuUnanth', function(req, res, next) {
	var roleid = req.body.rid;
	// console.log(roleid);
	RoleMenuModel.RoleMenuModel.find({role_id:roleid},function(err,rolemenu){
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
			//res.json(rolemenu);
			// console.log(rolemenu);
			var ids = [];
			for(var i = 0 ; i < rolemenu.length ; i ++){
				ids.push(rolemenu[i].menu_id);
			}
			// console.log(ids);
			MenuModel.MenuModel.find({_id:{$nin:ids}},function(err,menus){

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
					// console.log(menus);
					res.json(menus);
				}
			});
		}
	});
});

// 取消授权
router.post('/unauthmenu', function(req, res, next) {
	var roleid = req.body.rid;
	var menuid = req.body.mid;
	// console.log('roleid : '+roleid);
	// console.log('menuid : '+menuid);
	RoleMenuModel.RoleMenuModel.remove({role_id:roleid,menu_id:menuid},function(err,rm){
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
			console.log(rm);
			res.json({errors:''});
		}
	});
});


// 增加授权
router.post('/authmenu', function(req, res, next) {
	var roleid = req.body.rid;
	var menuid = req.body.mid;
	// console.log('roleid : '+roleid);
	// console.log('menuid : '+menuid);
	RoleMenuModel.RoleMenuModel.create({role_id:roleid,menu_id:menuid,createdby:req.session.user.usercode},function(err,ins){
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
			console.log(ins);
			res.json({errors:''});
		}
	});
});


// 增加角色
router.post('/addrole', function(req, res, next) {
	var rolename = req.body.rname;
	var roledesc = req.body.rdesc;
	console.log('rolename : '+rolename);
	console.log('roledesc : '+roledesc);

	RoleModel.RoleModel.count(function(err,count){
		console.log('count : '+count);
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
			RoleModel.RoleModel.create({rid:count+1,rname:rolename,rdesc:roledesc,createdby:req.session.user.usercode},function(err,ins){
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
					console.log(ins);
					res.json({errors:''});
				}
			});
		}
	});

			
});

module.exports = router;