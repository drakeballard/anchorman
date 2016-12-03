// including Dependencies
var models = require('../models');
var express = require('express');
var router = express.Router();

// route for root of articles
router.get('/', function(req, res) {
// seach for articles in articles table for current user
    models.Article.findAll({
        where: {
            user_id: req.session.user_id
        },
        // order: [createdAt, 'DESC']

        include: [models.User]
    }).then(function(articles) {

        console.log(articles);
        // return the list of save articles for current user and render using index.handlebars.
        res.render('index', {
            user_id: req.session.user_id,
            email: req.session.user_email,
            logged_in: req.session.logged_in,
            username: req.session.username,
            articles: articles
        })
    })
});
// route to save article to articles table
router.post('/create', function(req, res) {

    console.log("---------------------------------INSIDE CREATE----------------------");

    // save article to articles table
    models.Article.create({
        userId: req.session.username,
        sourceId: req.body.articleSource,
        author: req.body.articleAuthor,
        title: req.body.articleTitle,
        description: req.body.articleDescription,
        articleUrl: req.body.articleUrl,
        articleImageUrl: req.body.articleImageUrl,
        publishedAt: req.body.articlePublishedAt,
        user_id: req.session.user_id
    }).then(function() {
        // redirect to articles root that will display the save list for current user
        res.redirect('/articles');
    })
});
// route for user to delete article from their saved list
router.delete('/delete/:id', function(req, res) {
    // delete articles by articleID
    models.Article.destroy({
            where: {
                id: req.params.id
            }
        })
        // connect it to this .then.
        .then(function() {
            // redirects user to artciles root and display updated List using index.handlebars
            res.redirect('/articles');
        })
});

module.exports = router;
