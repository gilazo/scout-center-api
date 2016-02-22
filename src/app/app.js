var express = require('express');
var auth = require('basic-auth');
var authorizationService = require('./authorization/authorization-service');
var userRouter = require('./user/user-router')();
var rankRouter = require('./rank/rank-router')();

module.exports = () => {
    var app = express();
    
    app.use((req, res, next) => {    
        authorizationService.authorize(auth(req), authorized => {
            if (authorized === false) {
                return res.status(401).send();
            }
            
            next(); 
        });
    });

    app.use('/user', userRouter);
    app.use('/ranks', rankRouter);
    
    return app;
}; 
