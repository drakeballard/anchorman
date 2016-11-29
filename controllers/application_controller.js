var models  = require('../models');
var express = require('express');
var news = require('../news.js');
var router  = express.Router();

router.get('/', function(req, res) {
res.render('home');
});

router.get('/news/:category', function(req,res){
	var searchCategory = req.params.category;

news.getNews(searchCategory, function(data){
  // console.log(data);
  res.render('articles/articles', {articlesbysource: data});
});

});

module.exports = router;