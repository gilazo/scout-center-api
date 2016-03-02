var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config.json');
var auth = require('basic-auth');
var db = require('mongoose');
var hashService = require('./encryption/hash-service')();
var saltService = require('./encryption/salt-service')();
var decryptService = require('./encryption/decrypt-service')({
    auth: auth 
});
var authorizationService = require('./authorization/authorization-service')({ 
    config: config, 
    hashService: hashService,
    db: db
});
var userHandler = require('./user/user-handler')({
    express: express,
    config: config,
    hashService: hashService,
    saltService: saltService,
    db: db,
    bodyParser: bodyParser
});
var rankRouter = require('./rank/rank-router')();

module.exports = () => {
    var app = express();      

    app.use(handleBasicAuth);

    app.use('/user', userHandler);
    app.use('/ranks', rankRouter);           
    app.use((err, req, res, next) => {
        console.log(err);        
    });
    
    function handleBasicAuth(req, res, next) {
        if (req.path === '/user' && req.method === 'POST') return next();
        
        decryptService.decryptAuthorizationHeader(req, credentials => {
            if (!credentials) {
                res.status(401).end();
                
                return next('unauthorized');
            } else {
                authorizationService.authorize(credentials, authorized => {
                    if (authorized === false) {
                        res.status(401).end();
                        
                        return next('unauthorized');
                    }              
                });
                
                next();
            }
        });
    }        
    
    return app;
};
