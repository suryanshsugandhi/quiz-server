const 
    // modules
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    // =====================================

    // Routes
    // api = require('./routes/api'),
    question = require('./routes/question'),
    passport = require('passport'),    
	authRoutes = require('./routes/auth-routes.js'),
	expressSession  = require("express-session"),
	profileRoutes = require('./routes/profile-routes'),
    passportSetup = require('./config/passport-setup'),
    // =====================================

    // Environment
    PORT = process.env.PORT;
    // =====================================

// Passport setup
app.use(expressSession({
    secret: "My name is Aman",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Protocols, parsers
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// Application router
// app.use('/api',api);
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/question', question)


app.use((req, res, next)=>{
    res.locals.currentUsr = req.user;
    next();
});

app.get("/", (req, res)=>{
	res.send("<a href='/auth/login'>Login Here</a>");
});

app.get("/profile", (req,res)=>{
    res.render('Logged in successfully')
})

app.listen(PORT, (req, res)=>{
    console.log("Server running on localhost:" + PORT)
});
