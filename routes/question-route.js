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
    getUserQuestions()
    .then((questions)=>{
        console.log(req.user.questions)
        res.render('question.ejs',{user: req.user, questions: questions})
        
    });
});

router.get('/rules', (req,res)=>{
    res.render('rules.ejs', {user: req.user});
})

async function getUserQuestions(userId){
    var questions = await questions.find({_id: userId}, (err, user)=>{
        if(err){
            console.log("Error fetching user questions >>>", err);
        }
        else{
            console.log("User Questions fetched")
        }
        return user.questions;
    });
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