const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    // user schema according to fb/google policies
})

module.exports = mongoose.model('question', questionSchema, 'questions')