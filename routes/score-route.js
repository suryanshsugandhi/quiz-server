const express = require('express')
const router = express.Router();

const User = require('../models/user')

router.get('/', isLoggedIn, (req, res)=>{
    let user = req.user;

    User.findById(req.user._id, (err, user)=>{
        if(err){
            console.log("Score fetching error>>>", user.email);
        }
        var score = getScore(user);
    })
    .then((reqUser)=>{
        User.findByIdAndUpdate(reqUser._id, {score: score}, (err, user)=>{
            if(err)
                console.log("Error updating score>>>", user.email, score);
        })
        .then(()=>{
            res.render('score.ejs', {user: user, score: score})
        })
    })
})

function getScore(user){
    let score = 0;
    let userAnswers = [];
    let correctAnswers = [];

    user.questions.forEach(element => {
        correctAnswers.push(element.answer);
    });
    user.answers.forEach(element => {
        userAnswers.push(element.option);
    });

    for(let i = 0; i < userAnswers.length; i ++){
        if(userAnswers[i] == correctAnswers[i])
            ++score;
    }

    return score
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
