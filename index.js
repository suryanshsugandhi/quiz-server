const 
    express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    PORT = process.env.PORT || 3000,
    api = require('./routes/api'),
    app = express(),
	passport = require('passport'),
	authRoutes = require('./routes/auth-routes.js'),
	expressSession  = require("express-session"),
	profileRoutes = require('./routes/profile-routes'),
	passportSetup = require('./config/passport-setup'),
	mongoose = require('mongoose');

mongoose.connect("mongodb+srv://invento:inv@cluster0-k9hjv.mongodb.net/test?retryWrites=true&w=majority", ()=>{
	console.log("Connected to DB Success");
});

// initialize passport
app.use(expressSession({
    secret: "My name is Aman",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(bodyParser.json());
app.use('/api',api);
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use(function(req, res, next){
    res.locals.currentUsr = req.user;
    next();
});

app.get("/", function(req, res){
	res.send("<a href='/auth/login'>Login Here</a>");
});

app.listen(PORT || 3000 || process.env.PORT, (req, res)=>{
    console.log("Server running on localhost:" + PORT)
});