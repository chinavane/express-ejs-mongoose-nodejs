/**
 * 提供数据服务
 *
 */
var express = require('express');
var router = express.Router();

var test = require('../db/models/TestModel');
var db = require('../db/db');

router.get('/', function(req, res, next) {
	var testModel = test.testModel;

	// testModel.find({},function(err,docs){
	// 	console.log(docs);
	// 	res.send(docs);
	// });
	var username = req.session.user?req.session.user.username:'';
	res.render('test',{title:'这是测试功能',user:username});

});

/* GET home page. */
router.get('/init', function(req, res, next) {
	var testModel = test.testModel;
	//res.writeHead(200, {'Content-Type': 'application/json'});
	testModel.find({}).sort({_id:-1}).exec(function(err,docs){
		// console.log(docs);
		res.json(docs);
	});
	//res.render('test',{title:'good test'});
});

// 新增
router.post('/new', function(req, res, next) {
	var testModel = test.testModel;

	testModel.create({name:req.body.name,age:req.body.age,gender:req.body.gender},function(err,docs){
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
			testModel.find({}).sort({_id:-1}).exec(function(err,docs){
				// console.log(docs);
				res.json(docs);
			});
		}
	});
});


router.post('/del', function(req, res, next) {
	var id = req.body._id;
	var testModel = test.testModel;
	testModel.findByIdAndRemove(id,function(err,doc){
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
			console.log(doc);
			testModel.find({}).sort({_id:-1}).exec(function(err,docs){
				// console.log(docs);
				res.json(docs);
			});
		}
	});
});

// 更新操作
router.post('/update', function(req, res, next) {
	var id = req.body._id;
	var testModel = test.testModel;
	testModel.findByIdAndUpdate(id,{name:req.body.name,age:req.body.age,gender:req.body.gender},function(err,doc){
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
			console.log(doc);
			testModel.find({}).sort({_id:-1}).exec(function(err,docs){
				console.log(docs[0].name);
				res.json(docs);
			});
		}
	});
});

module.exports = router;
