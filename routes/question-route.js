const express = require('express')
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('question.ejs',{user: req.user, questions: req.user.questions})
    res.redirect('/?number=0')
});

router.post('/', (req,res)=>{
    var option = req.params.option,
        questionNumber = req.params.question;
    // add to database
    res.redirect('/?number=questionNumber')
})

router.get('/:number', (req, res)=>{
    if(req.params.number < 15){
        var questionNumber = req.params.number,
            questions = req.user.questions[questionNumber];
        res.render('question.ejs', {user: req.user, question: questions, number: questionNumber})
    }
    else{
        res.send("Quiz complete!");
    }
})

router.get('/rules', (req,res)=>{
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