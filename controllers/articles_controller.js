var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

    models.Article.findAll({
        where: {
            user_id: req.session.user_id
        },
        // order: [createdAt, 'DESC']

        include: [models.User]
    }).then(function(articles) {

        console.log(articles);

        res.render('index', {
            user_id: req.session.user_id,
            email: req.session.user_email,
            logged_in: req.session.logged_in,
            username: req.session.username,
            articles: articles
        })
    })
});

router.post('/create', function(req, res) {

    console.log("---------------------------------INSIDE CREATE----------------------");


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
        res.redirect('/articles');
    })
});

router.delete('/delete/:id', function(req, res) {
    // SOLUTION:
    // =========
    // use the Cat model to delete a cat
    // based on the id passed in the url
    models.Article.destroy({
            where: {
                id: req.params.id
            }
        })
        // connect it to this .then.
        .then(function() {
            res.redirect('/articles');
        })
});

module.exports = router;
