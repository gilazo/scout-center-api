var express = require('express');
var auth = require('basic-auth');
var authorizationService = require('./authorization/authorization-service')();
var userRouter = require('./user/user-router')();
var rankRouter = require('./rank/rank-router')();

module.exports = () => {
    var app = express();
    
    app.use((req, res, next) => {
        if (req.path !== '/user' && req.method !== 'POST') {
            authorizationService.authorize(auth(req), authorized => {
                if (authorized === false) {
                    res.status(401).send();
                    
                    next('unauthorized');
                }                
            });    
        }        
        
        next();  
    });

    app.use('/user', userRouter);
    app.use('/ranks', rankRouter);
    
    app.use((err, req, res, next) => {
        console.log(err);        
    });
    
    return app;
};
