// including the different Dependencies
var models = require('../models');
var express = require('express');
var news = require('../news.js');
var router = express.Router();

// based route for our application which is the homepage
router.get('/', function(req, res) {
    // points to home.handlebars
    res.render('home');
});

// route for search news page to display category grid
router.get('/news', function(req, res) {
    // get user login data
    var logged_in = req.session.logged_in;
    var userName = req.session.username;
    var user_id = req.session.user_id;
    var userEmail = req.session.user_email;
    // send user data and use articles by category.handlebars to render category.grid
    res.render('articles/articlesByCategory', {
        logged_in: logged_in,
        userName: userName,
        user_id: user_id,
        email: userEmail
    });

});

// route to search for news on category selector on news search page
router.get('/news/:category', function(req, res) {
    // get user login data
    var searchCategory = req.params.category;
    var logged_in = req.session.logged_in;
    var userName = req.session.username;
    var user_id = req.session.user_id;
    var userEmail = req.session.user_email;
    // set search category to an empty string to search across all categories
    if (searchCategory == "all") {
        searchCategory = "";
    }
    console.log("LOGGED IN VAL============================================== " + logged_in);
    // call get news from news.js to get top news across from multiple sources
    news.getNews(searchCategory, function(data) {
        // render articles return by articles.handlebars
        res.render('articles/articles', {
            articlesbysource: data,
            logged_in: logged_in,
            userName: userName,
            user_id: user_id,
            email: userEmail
        });
    });

});
// route to search for news based upon source selector
router.get('/news/:source/:sortBy', function(req, res) {
    // get source and sort by from request parameters
    var bySource = req.params.source;
    var sortBy = req.params.sortBy;
    // get user data from session
    var logged_in = req.session.logged_in;
    var userName = req.session.username;
    var user_id = req.session.user_id;
    var userEmail = req.session.user_email;

    // console.log("====================INSIDE GETNEWSBYSOURCE ========================="+bySource + sortBy);
    // call get news by source
    news.getNewsBySource(bySource, sortBy, function(result) {
        console.log(result);
        // render return news articles by using articles.handlebars
        res.render('articles/articlesBySource', {
            articlesList: result,
            logged_in: logged_in,
            userName: userName,
            user_id: user_id,
            email: userEmail
        });
    });

});
// route for searching source
router.get('/news/:category/:language/:country', function(req, res) {

    // console.log("====================INSIDE getSourceList =========================");
    // get search parameters from request params
    var category = req.params.category;
    var language = req.params.language;
    var country = req.params.country;
    // get user data from session
    var logged_in = req.session.logged_in;
    var userName = req.session.username;
    var user_id = req.session.user_id;
    var userEmail = req.session.user_email;

    // set parameters string to enable search across category, language and country
    if (category == "all") {
        category = "";
    }
    if (language == "all") {
        language = "";
    }
    if (country == "all") {
        country = "";
    }
    // get list of sources
    news.getSourceList(category, language, country, function(result) {
        // console.log(result);
        // render source list using sourcelist.handlebars
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
