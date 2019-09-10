const router = require('express').Router();
const passport = require('passport');
const User = require("../models/user.js");

// auth login
router.get('/login', (req, res) => {
    res.render('login.ejs');
});

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    req.logout();
    res.redirect('/');
});

// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['email', 'profile']
}));

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    if(req.user.hasPlayed){
        res.redirect('/question/played')
    }else{
        res.redirect('/question/rules');
    }
});

// auth with facebook
router.get('/facebook', passport.authenticate('facebook', {
    scope: ['email', 'user_friends', 'manage_pages']
}));

// callback route for facebook to redirect to
router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
    if(req.user.hasPlayed){
        res.redirect('/question/played')
    }else{
        res.redirect('/question/rules');
    }
});

module.exports = router;