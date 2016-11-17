"use strict";

exports.debug = true;
exports.port = 3100;
exports.dburl = 'mongodb://127.0.0.1/asys';
exports.dbsession = 'mongodb://localhost/sessiondb';

// 权限配置

exports.authorised={
	james:['/','/login','/login/logout',
	'/testd','/testd/init','/testd/new','/testd/del','/testd/update',
	'/api','/api_desc','/api_apply',
	'/mnguser','/mngrole','/mngmenu',
	'/register'],
	kevin:['/','/login','/login/logout','/register']
}

exports.allAuthorised=[
'/login','/login/logout',
'/testd','/testd/init','/testd/new','/testd/del','/testd/update',
'/register',
'/api','/api_desc','/api_apply',
'/mnguser','/mngrole','/mngmenu'
];