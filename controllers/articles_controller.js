var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
  res.render('index',{
      user_id: req.session.user_id,
      email: req.session.user_email,
      logged_in: req.session.logged_in,
      username: req.session.username
  	});
});

module.exports = router;