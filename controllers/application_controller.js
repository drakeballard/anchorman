var models  = require('../models');
var express = require('express');
var news = require('../news.js');
var router  = express.Router();

router.get('/', function(req, res) {
res.render('home');
});
router.get('/news', function(req, res) {
	var logged_in = req.session.logged_in;
    var userName = req.session.username;
    var user_id = req.session.user_id;
    var userEmail = req.session.user_email;
res.render('articles/articlesByCategory', {
		logged_in: logged_in,
	  	userName: userName,
	  	user_id: user_id,
	  	email: userEmail
});

});


router.get('/news/:category', function(req,res) {

	var searchCategory = req.params.category;
    var logged_in = req.session.logged_in;
    var userName = req.session.username;
    var user_id = req.session.user_id;
    var userEmail = req.session.user_email;

	if (searchCategory == "all"){
        searchCategory = "";
    }
    console.log("LOGGED IN VAL============================================== "+ logged_in);

	news.getNews(searchCategory, function(data){
	  res.render('articles/articles', {
	  	articlesbysource: data,
	  	logged_in: logged_in,
	  	userName: userName,
	  	user_id: user_id,
	  	email: userEmail
	  });
	});

});

router.get('/news/:source/:sortBy', function(req,res){

	var bySource = req.params.source;
	var sortBy = req.params.sortBy;

	var logged_in = req.session.logged_in;
    var userName = req.session.username;
    var user_id = req.session.user_id;
    var userEmail = req.session.user_email;

	// console.log("====================INSIDE GETNEWSBYSOURCE ========================="+bySource + sortBy);

	news.getNewsBySource(bySource, sortBy, function(result){
	  console.log(result);
	  res.render('articles/articlesBySource', {
	  	articlesList: result,
	  	logged_in: logged_in,
	  	userName: userName,
	  	user_id: user_id,
	  	email: userEmail
	  });
	});

});

router.get('/news/:category/:language/:country', function(req,res){

	// console.log("====================INSIDE getSourceList =========================");

	var category = req.params.category;
	var language = req.params.language;
	var country = req.params.country;

	var logged_in = req.session.logged_in;
    var userName = req.session.username;
    var user_id = req.session.user_id;
    var userEmail = req.session.user_email;


	if (category=="all") {
		category = "";
	}
	if (language=="all") {
		language = "";
	}
	if (country=="all") {
		country = "";
	}

	news.getSourceList(category, language, country, function(result){
		// console.log(result);
		res.render('sources/sourceList', {
			sourceList: result,
			logged_in: logged_in,
		  	userName: userName,
		  	user_id: user_id,
		  	email: userEmail
		});
	});
});

module.exports = router;
