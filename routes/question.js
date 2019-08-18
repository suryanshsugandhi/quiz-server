const express = require('express')
const router = express.Router();

const mongoose = require('mongoose');
const db = 'mongodb+srv://server:eoE9bZQcq1wc0OEX@questions-5t8we.mongodb.net/test?retryWrites=true&w=majority';

let databaseConnected = false;

mongoose.connect(db,err=>{
    if(err){
        console.log("Questions database error >>>", err);
    }
    else{
        databaseConnected = true;
        console.log("Connected to questions DB")
    }
});

router.post('/fetch', (req,res)=>{
    // Select 20 random questions
    // Export only questions not answers
    // JSON reponse
    if(databaseConnected){
        res.status(200).send('Hello')
    }
    else{
        res.status(501).send('Database error')
    }
})

router.post('/new', (req,res)=>{
    // To add questions to the database
    // To be done at last do not waste time
})


module.exports = router;