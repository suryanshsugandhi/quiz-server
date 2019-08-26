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

// hard coded configuration object
conf = {
    // look for PORT environment variable,
    // else look for CLI argument,
    // else use hard coded value for port 8080
    port: process.env.PORT || process.argv[2] || 8080,
 
    // origin undefined handler
    // see https://github.com/expressjs/cors/issues/71
    originUndefined: function (req, res, next) {
 
        if (!req.headers.origin) {
 
            res.json({
 
                mess: 'Hi you are visiting the service locally. If this was a CORS the origin header should not be undefined'
 
            });
 
        } else {
 
            next();
 
        }
 
    },
 
    // Cross Origin Resource Sharing Options
    cors: {
 
        // origin handler
        origin: function (origin, cb) {
 
            // setup a white list
            let wl = ['https://suryanshsugandhi.github.io/quiz-app'];
 
            if (wl.indexOf(origin) != -1) {
 
                cb(null, true);
 
            } else {
 
                cb(new Error('invalid origin: ' + origin), false);
 
            }
 
        },
 
        optionsSuccessStatus: 200
 
    }
 
};
 
// use origin undefined handler, then cors for all paths
app.use(conf.originUndefined, cors(conf.cors));

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
