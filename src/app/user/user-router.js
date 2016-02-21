var express = require('express');
var repository = require('./user-repository');

module.exports = () => {
    var app = express();
    
    app.get('/', (req, res, next) => {
        repository
            .getUser(req.username, user => {                
                res.status(302).send(user);
            });
    });
    
    app.get('/friends', (req, res, next) => {
        repository
            .getUsers(req.id, friends => {
                res.status(302).send(friends);
            });
    });
    
    return app;
};
