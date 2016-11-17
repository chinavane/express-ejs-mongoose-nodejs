var express = require('express');
var router = express.Router();

var MenuModel = require('../../db/models/MenuModel');
var db = require('../../db/db');

router.get('/', function(req, res, next) {

	var username = req.session.user?req.session.user.username:'';
	res.render('authority/mngmenu',{title:'管理菜单',user:username});
});

/* GET home page. */
router.get('/init', function(req, res, next) {

	MenuModel.MenuModel.find({}).sort({mid:1,order:1}).exec(function(err,docs){
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
			res.json(docs);
		}
	});

});

// 新增
router.post('/addmenu', function(req, res, next) {

	MenuModel.MenuModel.count(function(err,count){
		// console.log('count : '+count);
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
			MenuModel.MenuModel.create({mid:count+1,mname:req.body.name,murl:req.body.url,mdesc:req.body.desc,parentid:req.body.parentid,order:req.body.order,createdby:req.session.user.usercode},function(err,docs){
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
					//console.log(err.stack());
				}
				else{
					//如果正常，界面显示查询结果
					MenuModel.MenuModel.find({}).sort({mid:1,order:1}).exec(function(err,docs){
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
							res.json(docs);
						}
					});
				}
			});
		}
	});

			
});
module.exports = router;