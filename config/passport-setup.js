const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');
const mongoose = require('mongoose');
const User = require('../models/user.js');

// User database connection
let databaseConnected = false;
const db = ''
mongoose.connect(db, { useNewUrlParser: true }, err=>{
    if(err){
        console.log("User database error >>>", err);
    }
    else{
        databaseConnected = true;
        console.log("Connected to Users DB")
    }
});

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: '292942950086-4lc8is7n39h0bpjld7vk3t4mp5jkcl9s.apps.googleusercontent.com',
        clientSecret: 'PN0xOKTSW3HN2xyoAHmY_YYm',
		callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done)=>{
			console.log(profile);
			User.findOne({googleId: profile.id}).then((foundUser)=>{
				if(foundUser){
					console.log("User already exists"+foundUser);
					done(null, foundUser);
				}
				else{
					new User({
						googleId: profile.id,
						fullName: profile.displayName,
						email: profile._json.email,
					}).save().then((newUser)=>{
						console.log("new user created successfully");
						done(null, newUser);
						});
				}
			});

       }
	)
);

passport.use(
    new FacebookStrategy({
        clientID: '2407095239535092',
        clientSecret: 'c9107159c3c21fe26b6e730218b9f7a4',
		callbackURL: 'https://quiz-server-sbohj.run.goorm.io/auth/facebook/redirect',
		profileFields: ['id', 'displayName', 'photos', 'email', 'address', 'last_name', 'first_name']
    }, (accessToken, refreshToken, profile, done)=>{
			console.log(profile);
		    User.findOne({facebookId: profile.id}).then((foundUser)=>{
				if(foundUser){
					console.log("User already exists"+foundUser);
					done(null, foundUser);
				}
				else{
					new User({
						facebookId: profile.id,
						email: profile._json.email,
						fullName: profile.displayName,
					}).save().then((newUser)=>{
						console.log("new user created successfully");
						done(null, newUser);
						});
				}
			});

       }
	)
);
