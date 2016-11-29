var models  = require('../models');
var express = require('express');
var news = require('../news.js');
var router  = express.Router();

router.get('/', function(req, res) {
res.render('home');
});

router.get('/news/:category', function(req,res) {

	var searchCategory = req.params.category;
		if (searchCategory == "all"){
        searchCategory = "";
    }

	news.getNews(searchCategory, function(data){
	  // console.log(data);
	  res.render('articles/articles', {articlesbysource: data});
	});

});

router.get('/news/:source/:sortBy', function(req,res){

	var bySource = req.params.source;
	var sortBy = req.params.sortBy;

	console.log("====================INSIDE GETNEWSBYSOURCE ========================="+bySource + sortBy);

	news.getNewsBySource(bySource, sortBy, function(result){
	  // console.log(result);
	  res.render('articles/articlesBySource', {articlesList: result});
	});

});

router.get('news/:category/:language/:country', function(req,res){
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
		console.log(res);
		res.render('sources/sourceList', {sourceList: result});
	});



});

module.exports = router;
