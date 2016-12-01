var models  = require('../models');
var express = require('express');
var news = require('../news.js');
var router  = express.Router();

router.get('/', function(req, res) {
res.render('home');
});
router.get('/news', function(req, res) {
res.render('articles/articlesByCategory');
});


router.get('/news/:category', function(req,res) {

	var searchCategory = req.params.category;
    var logged_in = req.session.logged_in;

		if (searchCategory == "all"){
        searchCategory = "";
    }
    console.log("LOGGED IN VAL============================================== "+ logged_in);
	
	news.getNews(searchCategory, function(data){	  
	  res.render('articles/articles', {
	  	articlesbysource: data,
	  	logged_in: logged_in
	  });
	});

});

router.get('/news/:source/:sortBy', function(req,res){

	var bySource = req.params.source;
	var sortBy = req.params.sortBy;

	// console.log("====================INSIDE GETNEWSBYSOURCE ========================="+bySource + sortBy);

	news.getNewsBySource(bySource, sortBy, function(result){
	  console.log(result);
	  res.render('articles/articlesBySource', {articlesList: result});
	});

});

router.get('/news/:category/:language/:country', function(req,res){

	// console.log("====================INSIDE getSourceList =========================");

	var category = req.params.category;
	var language = req.params.language;
	var country = req.params.country;
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
		res.render('sources/sourceList', {sourceList: result});
	});
});

module.exports = router;
