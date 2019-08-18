const   express = require('express'),
        router = express.Router(),
        mongoose = require('mongoose'),
        // user DB
        db = 'mongodb+srv://server:eoE9bZQcq1wc0OEX@questions-5t8we.mongodb.net/test?retryWrites=true&w=majority'


mongoose.connect(db, err => {
    if(err){
        console.error("User database error >>> " + err)
    }
    else{
        console.log("Connected to users DB")
    }
})

router.post('/', (req, res)=>{
    res.status(404).send('Route not found')
});

// USER MANAGEMENT
router.post('/signup', (req, res)=>{
    // Connection to google/facebook
    // Checking wether user has played before
    // Returning json accordingly
    res.status(200).send('This is the signup api')
})

router.post('/submit', (req, res)=>{
    // Submitting and checking answers at backend
    // Returning results
    res.status(200).send('This is the submission api')
})

module.exports = router;
