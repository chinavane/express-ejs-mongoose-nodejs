var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rsaKeysSchema = new Schema({
	privkey : {
		type : String,
		required : true,
	},
	pubkey : {
		type : String,
		required : true
	},
	applyer : {
		type : Schema.Types.ObjectId,
		ref: 'userinfo'
	}
},{collection:'rsakeys'});

var rsaKeysModel = mongoose.model('rsakeys',rsaKeysSchema);

exports.rsaKeysSchema = rsaKeysSchema;
exports.rsaKeysModel = rsaKeysModel;