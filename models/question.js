const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    title: String,
    // options need to be comma separated
    options: String,
    // answer should be string not abcd
    answer: String,
})

module.exports = mongoose.model('question', questionSchema, 'questions')