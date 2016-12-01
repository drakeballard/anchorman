var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {

models.Article.findAll({
	where:{
		user_id : req.session.user_id
	},
	include: [ models.User ]
 }).then (function(articles){
 	res.render('index',{
      user_id: req.session.user_id,
      email: req.session.user_email,
      logged_in: req.session.logged_in,
      username: req.session.username,
      articles: articles
  	})
 })  
});

router.post('/create', function (req, res) {

	console.log("REquest data inside article create=================="+ req.body);
  
  // SOLUTION:
  // =========
  // use the Cat model to create a cat based on what's
  // passed in req.body (name, sleepy, user_id)
  models.Article.create({
    userId: req.session.userName,
    sourceId: req.body.articleSource,
    author: req.body.articleAuthor,
    title: req.body.articleTitle,
    description: req.body.articleDescription,
    articleUrl: req.body.articleUrl,
    articleImageUrl: req.body.articleImageUrl,
    publishedAt: req.body.articlePublishedAt,
    user_id: req.session.user_id
  }).then(function(){
    res.redirect('/articles');
  })
});

module.exports = router;