var express = require('express');
var app = express();
var auth = require('basic-auth');
var config = require('./config.json');
var authorizationService = require('./authorization/authorization-service');
var userRouter = require('./user/user-router')();
var rankRouter = require('./rank/rank-router')();

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

app.listen(config.server.port, () => {
    console.log('listening on port %s', config.server.port); 
});
