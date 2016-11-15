var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoleMenu = new Schema({
	role_id : {
		type : Schema.Types.ObjectId,
		ref: 'role',
		required : true
	},
	menu_id : {
		type : Schema.Types.ObjectId,
		ref: 'menu',
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
},{collection:'rolemenu'});

var roleMenuModel = mongoose.model('rolemenu',RoleMenu);

exports.RoleMenuSchema = RoleMenu;
exports.RoleMenuModel = roleMenuModel;