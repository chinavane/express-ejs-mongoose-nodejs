var config = require('../config');

var UserModel = require('../db/models/UserModel');
var MenuModel = require('../db/models/MenuModel');
var RoleModel = require('../db/models/RoleModel');

var UserRoleModel = require('../db/models/UserRoleModel');
var RoleMenuModel = require('../db/models/RoleMenuModel');
var db = require('../db/db');

var allAuthorised =[];
var userMenus = {};

module.exports = function() {
    
   //  return function(req, res, next) {
   //  	if(config.allAuthorised.indexOf(req.url)<0){
   //  		console.log('No need to Authority : '+req.url);
   //  		next();
   //  	}
   //  	else{
   //  		if(req.session.user){
		 //    	console.log("用户 "+req.session.user.usercode);
		 //    	var usercode = req.session.user.usercode;
		 //    	console.log(config.authorised[usercode]);
		 //    	var author = config.authorised[usercode];
		 //    	if(usercode != 'undefined'){
		 //    		// 无权访问
		 //    		if(author !='undefined' && author !='' && author.indexOf(req.url)<0){
		 //    			console.log(usercode+' --- 无权访问 '+req.url)
		 //    			res.json({errors:'无权访问'});
		 //    		}
		 //    		else{
		 //    			next();
		 //    		}
		 //    	}
		 //    	else{
		 //    		next();
		 //    	}
			// }
			// else{
			// 	next();
			// }
   //  	}
   //  };

   return function(req,res,next){
   		if(allAuthorised.length < 1){
   			MenuModel.MenuModel.find({},function(err,menus){
	   			if(err){
	   				console.log(err);
	   			}
	   			else{
	   				for(var i = 0 ; i < menus.length ; i ++){
	   					allAuthorised.push(menus[i].murl);
	   				}
	   				// 权限处理
	   				auth(req,res,next);
	   			}
	   		});
   		}
   		else{
   			// 权限处理
   			auth(req,res,next);
   			
   		}
   		
   };
};



function auth(req,res,next){

	

	// 不在菜单控制范围内的不限权限
	if(allAuthorised.indexOf(req.url)<0){
		console.log('No need to Authority : '+req.url);
		next();
	}
	else{
		if(req.session.user){
	    	// console.log("用户 "+req.session.user.usercode);
	    	var usercode = req.session.user.usercode;
	    	// 如果已经存在，不再查找数据库
	    	if(userMenus[usercode]){
	    		console.log('权限已缓存.');
	    		if(usercode != 'undefined'){
		    		// 无权访问
		    		if(userMenus[usercode] !='undefined' && userMenus[usercode] !='' && userMenus[usercode].indexOf(req.url)<0){
		    			console.log(usercode+' --- 无权访问 '+req.url)
		    			res.json({errors:'无权访问'});
		    		}
		    		else{
		    			next();
		    		}
		    	}
		    	else{
		    		next();
		    	}// if(usercode != 'undefined')
	    	}
	    	else{
	    		var usercode = req.session.user.usercode;
	    		// 查找权限
	    		UserModel.UserModel.findOne({usercode:usercode},function(err,user){
					if(err){
						console.log(err);
					}
					else{
						// console.log(user);

						UserRoleModel.UserRoleModel.findOne({user_id:user},function(err,userrole){
							// console.log(userrole);
							if(err || userrole == null || userrole == ''){
								res.json({errors:'无权访问'});
							}
							RoleMenuModel.RoleMenuModel.find({role_id:userrole.role_id},function(err,rolemenu){
								// console.log(rolemenu);
								console.log('-----------------------------');
								var theMenus = [];
								var ids = [];
								for(var j = 0 ; j < rolemenu.length ; j ++){
									ids.push(rolemenu[j].menu_id);
								}
								console.log(ids);
								MenuModel.MenuModel.find({_id:{$in:ids}},function(err,menus){
									// console.log(menus);

									for(var j = 0 ; j < menus.length ; j ++){
										theMenus.push(menus[j].murl);
									}
									userMenus[usercode] = theMenus;
									// console.log(userMenus);


									if(usercode != 'undefined'){
							    		// 无权访问
							    		if(userMenus[usercode] !='undefined' && userMenus[usercode] !='' && userMenus[usercode].indexOf(req.url)<0){
							    			console.log(usercode+' --- 无权访问 '+req.url)
							    			res.json({errors:'无权访问'});
							    		}
							    		else{
							    			next();
							    		}
							    	}
							    	else{
							    		next();
							    	}// if(usercode != 'undefined')
									//------------------
								});
							});
						});
					}
					
				});

	    	}

	    	
		}
		else{
			next();
		}

	}// else




	
	
}