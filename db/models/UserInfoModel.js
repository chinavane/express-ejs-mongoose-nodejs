var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userInfoSchema = new Schema({
	username : {
		type : String,
		required : [true,'why no name?'],
	},
	usercode : {
		type : String,
		required : true
	},
	password : {
		type : String,
		required : [true,'why no password?'],
	}
},{collection:'userinfo'});

var userInfoModel = mongoose.model('userinfo',userInfoSchema);

exports.userInfoSchema = userInfoSchema;
exports.userInfoModel = userInfoModel;