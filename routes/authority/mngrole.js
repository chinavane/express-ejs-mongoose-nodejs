var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

	var username = req.session.user?req.session.user.username:'';
	res.render('authority/mngrole',{title:'管理角色',user:username});
});

module.exports = router;