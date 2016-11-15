var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Role = new Schema({
	rid : {
		type : Number,
		required : [true,'role id needed'],
	},
	rname : {
		type : String,
		required : [true,'role name needed'],
	},
	rdesc : String,
	createdtime : {
		type : Date,
		required : true,
		default : Date.now
	},
	createdby : {
		type : String,
		required : true,
	}
},{collection:'role'});

var roleModel = mongoose.model('role',Role);

exports.RoleSchema = Role;
exports.RoleModel = roleModel;