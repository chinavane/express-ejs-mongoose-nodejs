var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserRole = new Schema({
	user_id : {
		type : Schema.Types.ObjectId,
		ref: 'user',
		required : true
	},
	role_id : {
		type : Schema.Types.ObjectId,
		ref: 'role',
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
},{collection:'userrole'});

var userRoleModel = mongoose.model('userrole',UserRole);

exports.UserRoleSchema = UserRole;
exports.UserRoleModel = userRoleModel;