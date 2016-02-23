var mongoose = require('mongoose');

module.exports = mongoose.model('User', mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true }, 
    ranks: [{ 
        name: String,
        requirements: [{
            number: String,
            completed: Date
        }]
    }]
}));
