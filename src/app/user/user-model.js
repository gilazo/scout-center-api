var mongoose = require('mongoose');

module.exports = mongoose.model('User', mongoose.Schema({
    username: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: String,
    salt: String,
    age: { type: Number, required: true },
    active: { type: Boolean, default: true },
    ranks: [{ 
        name: String,
        requirements: [{
            number: String,
            completed: Date
        }]
    }]
}));
