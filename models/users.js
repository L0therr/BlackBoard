var mongoose = require('mongoose');

var msgSchema = mongoose.Schema({
    title: String,
    content: String,
    dateExp: Date,
    read: Boolean,
    sender: String,
});

var tasksSchema = mongoose.Schema({
    name: String,
    category: String,
    owner: String,
    dateInsert: Date,
    dateDue: Date,
    dateCloture: Date,
});

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    age: Number,
    status: String,
    gender: String,
    dateInsert: Date,
    messages: [ msgSchema ],
    tasks: [ tasksSchema ],
});

var userModel = mongoose.model('users', userSchema);

module.exports = userModel;

console.log('====== users export done ====')