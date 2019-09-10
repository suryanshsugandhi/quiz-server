const express = require('express')
const router = express.Router();

router.get('/',  isLoggedIn, (req, res)=>{
    // res.render('question.ejs',{user: req.user, questions: req.user.questions})
    res.redirect('/question/quiz/?number=0')
});

router.post('/', (req,res)=>{
    var option = req.params.option,
        questionNumber = req.params.question;
    // add to database
    var nextQuestion = '/question/quiz/?number=' + (questionNumber+1).toString();
    res.redirect(nextQuestion);
})

router.get('/quiz',  isLoggedIn, (req, res)=>{
    if(req.query.number < 15){
        var questionNumber = req.query.number,
            question = req.user.questions[questionNumber];
        res.render('question.ejs', {user: req.user, question: question, number: questionNumber})
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