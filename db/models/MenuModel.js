var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Menu = new Schema({
	mid : {
		type : Number,
		required : [true,'menu id needed'],
	},
	mname : {
		type : String,
		required : [true,'menu name needed'],
	},
	murl : {
		type : String,
		required : [true,'menu url needed'],
	},
	mdesc : String,
	parentid : {
		type : Number,
		required : true,
		default : 0
	},
	order : {
		type : Number,
		required : true
	},
	createdtime : {
		type : Date,
		required : true,
		default : Date.now
	},
	createdby : {
		type : String,
		required : true,
	}
},{collection:'menu'});

var menuModel = mongoose.model('menu',Menu);

exports.MenuSchema = Menu;
exports.MenuModel = menuModel;