const express = require('express')
const router = express.Router();

const Question = require('../models/question')
const User = require('../models/user')

const mongoose = require('mongoose');
const db = 'mongodb+srv://server:eoE9bZQcq1wc0OEX@questions-5t8we.mongodb.net/test?retryWrites=true&w=majority';

let databaseConnected = false;

mongoose.connect(db, { useNewUrlParser: true }, err=>{
    if(err){
        console.log("Questions database error >>>", err);
    }
    else{
        databaseConnected = true;
        console.log("Connected to questions DB")
    }
});

router.get('/', (req, res)=>{
    var questions = getQuestions()
    .then((questions)=>{
        console.log("Questions fetched in route");
        res.render('question.ejs',{user: req.user, questions: questions})
    })

});

router.get('/rules', (req,res)=>{
    // add questions to user db
    var method = req.query.method;

    var questions = getQuestions()
    .then((questions)=>{
        console.log("Questions fetched in route");
        if(method == 'google'){
            User.findOneAndUpdate({googleId: req.user.googleId}, {$inc: {"questions": questions}});
            console.log('Google login', questions)
        }
        else if(method == 'facebook'){
            User.findOneAndUpdate({facebookId: req.user.facebookId}, {$inc: {"questions": questions}});
            console.log('Facebook login', questions)
        }
        else{
            console.log('Skipped', questions)
        }
    })

    res.render('rules.ejs', {user: req.user});
})

async function getQuestions(){
    if(databaseConnected){
        var questions = await Question.find({}, {answer: 0}, (err,questions)=>{
			if(err){
                console.log("Error fetching questions >>>", err);
                return 0;
			}
			else{
                console.log("Questions fetched successfully")
			}
        })
        // ##############To Randomize Array###################
        var l = questions.length;
        for(var i=0; i<l-1; i++){
            var rand = Math.floor((Math.random() * (l-i-1)) + i+1);
            var temp = questions[i];
            questions[i] = questions[rand];
            questions[rand] = temp;
        }
        // ###################################################
        questions = questions.slice(0,15);
        return (questions);
    }
    else{
        console.log("Database not connected");
        return 0;
    }
}

function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
     return next();
    else
    {  
        res.redirect("/auth/login");
    }
}

module.exports = router;