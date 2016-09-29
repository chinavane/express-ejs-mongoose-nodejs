exports.authorityFilter = function(req,res,next){
	if(!req.session || !req.session.user){
		
		res.redirect('/login');
	}
	else{
		next();
	}
}