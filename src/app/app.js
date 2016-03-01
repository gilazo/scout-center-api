var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config.json');
var auth = require('basic-auth');
var db = require('mongoose');
var hashService = require('./encryption/hash-service')();
var saltService = require('./encryption/salt-service')();
var authorizationService = require('./authorization/authorization-service')({ 
        auth: auth,
        config: config, 
        hashService: hashService,
        db: db
    });
var userHandler = require('./user/user-handler')({
    express: express,
    config: config,
    hasService: hashService,
    saltService: saltService,
    db: db,
    bodyParser: bodyParser
});
var rankRouter = require('./rank/rank-router')();

module.exports = () => {
    var app = express();
    
    app.use((req, res, next) => {
        if (req.path !== '/user' && req.method !== 'POST') {
            authorizationService.authorize(req, authorized => {
                if (authorized === false) {
                    res.status(401).end();
                    
                    return next('unauthorized');
                } else {
                    next();
                }               
            });    
        } else {
            next(); 
        }                       
    });

    app.use('/user', userHandler);
    app.use('/ranks', rankRouter);
    
    app.use((err, req, res, next) => {
        console.log(err);        
    });
    
    return app;
};
