'use strict'
// use package Dependencies
var NewsApi = require('./lib/news-api-njs'),
    config = require('./config/config.json');
var news = new NewsApi({
    apiKey: config.apiKey
});

// module exports functions that returns articles based on categories, sources and list of sources
module.exports = {
  // returns the list of sources for category and for each source it will retun the top news articles
    getNews: function(category, cb) {
        var articlesArry = [];
        // get list of available news sources for category: default is currently set up for English and the US
        news.getSources({
            category: category,
            language: 'en',
            country: 'us'
        }).then(function(res) {
            // for each source returned in the respond call get articles to get top news
            for (let i = 0; i < res.sources.length; i++) {
                // get top news articles for current source
                news.getArticles({
                    source: res.sources[i].id,
                    sortBy: res.sources[i].sortBysAvailable[0]
                }).then(function(result) {
                    // create object combining information returned by get source and get articles and store it in articles array
                    articlesArry.push({
                        category: category.toUpperCase(),
                        sourceDetails: res.sources[i],
                        articlesList: result
                    });
                    // check if all sources are searched before calling the call back function to send articles array
                    if (articlesArry.length === res.sources.length) {
                        cb(articlesArry);
                    }
                }).catch(function(err) {
                    console.log(err);
                });

            }
        }).catch(function(err) {
            console.log(err);
        });
    },

    // get top news based on source selector
    getNewsBySource: function(source, sortBy, cb) {
        news.getArticles({
            source: source,
            sortBy: sortBy
        }).then(function(res) {
            cb(res);
        }).catch(function(err) {
            console.log(err);
        });
    },

    // get list of sources for particular category 
    getSourceList: function(category, language, country, cb) {
        news.getSources({
            category: category,
            language: language,
            country: country
        }).then(function(res) {
            cb(res);
        }).catch(function(err) {
            console.log(err);
        });
    }
}
