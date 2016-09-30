var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

	var username = req.session.user?req.session.user.username:'';
	res.render('api_desc',{title:'API说明',user:username});
});

module.exports = router;