var express = require('express');
var router = express.Router();
var http = require('http');
// 把请求转发到新的地址，返回json数据集再返回到前台
router.get('/', function(req, res, next) {

	var username = req.session.user?req.session.user.username:'';
	
	var content = '';
	var url = "http://localhost:8082/dev/student/all";
    http.get(url, function(resp) {
        resp.on('data', function(data) {
            content += data;
        }).on('end', function() {
        	console.log(content);
            res.render('reqforword',{title:'请求转发',user:username,news:content});
        });
    })

});

module.exports = router;