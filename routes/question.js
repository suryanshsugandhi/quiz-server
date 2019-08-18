const express = require('express')
const router = express.Router();

const Question = require('../models/question')

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

router.post('/fetch', (req,res)=>{
    // Select 20 random questions
    // Export only questions not answers
    // JSON reponse
    if(databaseConnected){
        Question.find({}, (err,questions)=>{
			if(err){
				res.status.send('Unable to find questions')
				console.log("Error fetching questions >>>", err);
			}
			else{
				res.status(200).send(questions)
				console.log("Questions fetched successfully")
			}
		})
    }
    else{
        res.status(501).send('Database error')
    }
})

module.exports = router;