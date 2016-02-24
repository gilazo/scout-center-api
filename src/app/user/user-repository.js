var db = require('mongoose');
var config = require('../config.json');
var hashService = require('../encryption/hash-service')();
var saltService = require('../encryption/salt-service')();
var User = require('./user-model');

module.exports = () => {
    var service = {
        getUser: getUser,
        getUserRanks: getUserRanks,
        getUsers: getUsers,
        addUser: addUser,
        updateUser: updateUser
    };
    
    return service;
    
    function getUser(username, callback) {
        callback({});
    }

    function getUserRanks(id, callback) {
        callback([{}]);
    }

    function getUsers(id, callback) {
        callback([{}]);
    }

    function addUser(user, callback) {
        db.connect(config.db.url);
        
        user.password = hashService.hashValue(user.password);
        user.salt = saltService.getSalt();
        user.password = hashService.hashValue(`${user.password}${user.salt}`);
        
        user = new User(user);
        
        user.save(err => {
            db.connection.close();
            if (err) return callback(err);
            
            callback();      
        });
    }

    function updateUser(user, callback) {
        callback();
    }    
};
