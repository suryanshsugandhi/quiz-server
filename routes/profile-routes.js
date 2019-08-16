const router = require('express').Router();

// const authCheck = (req, res, next) => {
//     if(!req.isAuthenticated()){
//         res.redirect('/auth/login');
//     } else {
//         next();
//     }
// };

router.get('/', isLoggedIn, (req, res) => {
    res.render('profile.ejs', { user: req.user });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
     return next();
    else
    {  
        res.redirect("/auth/login");
    }
}

module.exports = router;