// including Dependencies
var bcrypt = require('bcryptjs'); //package used to encrypt the password
var models = require('../models');
var express = require('express');
var router = express.Router();

//route to driect user to sign up
router.get('/new', function(req, res) {
    // if user is logged in redirect to articles root
    if (req.session.logged_in == true) {
        res.redirect('/articles')

    } else {
        // render signup form
        res.render('users/newuser');
    }
});
// routes  to sign in,
router.get('/sign-in', function(req, res) {
    //if user is logged in redirect him to articles root
    if (req.session.logged_in == true) {
        res.redirect('/articles')
    } else {
        // render the login form
        res.render('users/signin');
    }

});
// route for sign out
router.get('/sign-out', function(req, res) {
    // destrou current session and redirect to all top news for all sources
    req.session.destroy(function(err) {
        res.redirect('/news/all')
    })
});

// login
router.post('/login', function(req, res) {
    // find user with current email address
    models.User.findOne({
        where: {
            email: req.body.email
        }
    }).then(function(user) {
        // if user does not exist, redirect them to sign up page
        if (user == null) {
            res.redirect('/users/sign-in')
        }

        // Use bcrypt to compare the user's password input
        // with the hash stored in the user's row.
        // If the result is true,
        bcrypt.compare(req.body.password, user.pwdHash, function(err, result) {
            // if the result is true (and thus pass and hash match)
            if (result == true) {
                // save the user's information
                // to req.session,
                // enter the user's session by setting properties to req.
                // save the logged in status to the session
                req.session.logged_in = true;
                // the username to the session
                console.log("INSIDE LOGIN " + user.userName);
                req.session.username = user.userName;
                // the user id to the session
                req.session.user_id = user.id;
                // and the user's email.
                req.session.user_email = user.email;
                //save user session and redirect to article root to display artciles saved by user
                res.redirect('/articles');
            }
            // if the result is anything but true (password invalid)
            else {
                // redirect user to sign in
                res.redirect('/users/sign-in')
            }
        })
    })
});


// register a user
router.post('/create', function(req, res) {
    // check if current user email address already exists
    models.User.findAll({
        where: {
            email: req.body.email
        }
    }).then(function(users) {
        // if user exists, send response user exists
        if (users.length > 0) {
            console.log(users)
            res.send('we already have an email or username for this account')
        } else {

            // Using bcrypt, generate a 10-round salt,
            // then use that salt to hash the user's password.
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {

                    // Using the User model, create a new user,
                    // storing the email they sent and the hash you just made
                    models.User.create({
                            email: req.body.email,
                            userName: req.body.username,
                            pwdHash: hash
                        })

                        // save the user's information to req.session

                        .then(function(user) {

                            //save the logged in status to the session
                            req.session.logged_in = true;
                            // the username to the session
                            req.session.username = user.userName;
                            // the user id to the session
                            req.session.user_id = user.id;
                            // and the user's email.
                            req.session.user_email = user.email;

                            // redirect to article root to display saved articles for user
                            res.redirect('/articles')
                        })
                })
            })
        }
    })
});

module.exports = router;
