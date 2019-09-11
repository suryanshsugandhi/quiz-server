const mongoose = require('mongoose')
const Schema = mongoose.Schema

const feedbackSchema = new Schema({
    name: String,
    email: String,
    feedback: String
})

module.exports = mongoose.model('feedback', feedbackSchema, 'feedbacks')