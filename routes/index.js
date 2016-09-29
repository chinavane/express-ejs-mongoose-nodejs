var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('index page.');
	var username = req.session.user?req.session.user.username:'';
  	res.render('index', { title: 'Express' ,user:username});
});

module.exports = router;
