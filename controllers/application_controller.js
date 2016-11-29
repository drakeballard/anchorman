var models  = require('../models');
var express = require('express');
var news = require('../news.js');
var router  = express.Router();

router.get('/', function(req, res) {

news.getNews('technology', function(data){
  // console.log(data);
  res.render('articles/articles', {articlesbysource: data});
});


});

module.exports = router;