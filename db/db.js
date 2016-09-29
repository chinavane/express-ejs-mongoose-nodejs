var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.dburl, { config: { autoIndex: false } });

var db = mongoose.connection;

exports.db = db;