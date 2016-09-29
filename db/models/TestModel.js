var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var testdataSchema = new Schema({
	name : {
		type : String,
		required : [true,'why no name?'],
	},
	age : {
		type : Number,
		required : true,
		min : [0,'not validate age'],
		max : 65
	},
	gender : {
		type : String,
		enum : ['male','female']
	}
},{collection:'peoples'});

var testModel = mongoose.model('test',testdataSchema);

exports.testSchema = testdataSchema;
exports.testModel = testModel;