var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
	hasPlayed: Boolean,
    username: String,
    password: String,
	googleId: String,
	facebookId: String,
	fullName: String,
	email: {type: String, sparse: true},
	phoneNo: {type: String},
	address: String,
	questions: Array,
	picture: String,
	answers: Array,
	score: Number
});

module.exports = mongoose.model("User", userSchema);