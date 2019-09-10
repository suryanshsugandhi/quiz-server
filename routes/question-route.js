const express = require('express')
const router = express.Router();

const User = require('../models/user')


router.get('/',  isLoggedIn, (req, res)=>{
    // res.render('question.ejs',{user: req.user, questions: req.user.questions})
    res.redirect('/question/quiz/?number=0')
});

router.post('/', (req,res)=>{
    var option = req.body.option,
        questionNumber = req.body.question;

    var answer  = {
        questionNumber: questionNumber,
        option: option
    }
    User.findByIdAndUpdate(req.user._id, {$push: {answers: answer}}, {new: true, upsert: true}, (err, user)=>{
        console.log(user.fullName);
    })
    // add to database
    var nextQuestion = '/question/quiz/?number=' + (parseInt(questionNumber) + 1).toString();
    res.redirect(nextQuestion);
})

router.get('/quiz',  isLoggedIn, (req, res)=>{
    if(parseInt(req.query.number) < 15){
        var questionNumber = req.query.number,
            question = req.user.questions[questionNumber];
        res.render('question.ejs', {user: req.user, question: question, questionNumber: questionNumber})
    }
    else{
        res.send("Quiz complete!");
    }
})

router.get('/rules', isLoggedIn, (req,res)=>{
    res.render('rules.ejs', {user: req.user});
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
     return next();
    else
    {  
        res.redirect("/auth/login");
    }
}

module.exports = router;