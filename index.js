const 
    // modules
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    User = require('./models/user'),
    Feedback = require('./models/feedback')
    // =====================================

    // Routes
    // api = require('./routes/api'),
    questionRoute = require('./routes/question-route'),
    passport = require('passport'),    
	authRoutes = require('./routes/auth-routes.js'),
	expressSession  = require("express-session"),
	profileRoutes = require('./routes/profile-routes'),
    passportSetup = require('./config/passport-setup'),
    scoreRoute = require('./routes/score-route');
    // =====================================

    // Environment
    PORT = process.env.PORT || 3000;
    // =====================================

// Passport setup
app.use(expressSession({
    secret: "My name is Aman",
    resave: false,
    saveUninitialized: false
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.use(passport.initialize());
app.use(passport.session());

// Protocols, parsers
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.static(__dirname + '/public'));
// Application router
// app.use('/api',api);
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/question', questionRoute);
app.use('/score', scoreRoute);

app.use((req, res, next)=>{
    res.locals.currentUsr = req.user;
    next();
});

app.get("/", (req, res)=>{
    User.find({}).sort({score: -1}).exec((err, users)=>{
        let topUsers = users;
        res.render("home.ejs", {users: topUsers});
    })
});
app.get('/developers', (req, res)=>{
    res.render('developers.ejs')
})

// app.get('/test', (req,res)=>{
//     res.render('question.ejs', {question: {
//         title: 'Question Title',
//         options: 'optiona, dusajd, jdifkjd, dijsf;k',
//         answer: 'a'
//     }, questionNumber: 1})
// })

// app.get('/test', (req, res)=>{
//     res.render('score.ejs', {user: {
//         fullName: 'Suryansh Sugandhi'
//     }, score: 12})
// })

app.get('/certificate', (req,res)=>{
    let user = req.user;
    let score = req.body.score
    res.render('certificate.ejs', {user: user, score: score})
})

app.get('/feedback', (req,res)=>{
    let user = req.user;
    req.logout();
    res.render('feedback.ejs', {user: user})
})

app.post('/feedback', isLoggedIn, (req, res)=>{
    let name = req.body.name;
    let email = req.body.email;
    let feedback = req.body.feedback;
    let result = new Feedback({
        'name': name,
        'email': email,
        'feedback': feedback
    })

    Feedback.save(result, (err, result)=>{
        if(err){
            console.log(err);
        }
        else {
            console.log("New feedback generated")
        }
    }).then(()=>{
        res.redirect('/')
    })
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
     return next();
    else
    {  
        res.redirect("/auth/login");
    }
}

app.listen(PORT, (req, res)=>{
    console.log("Server running on localhost:" + PORT)
});
