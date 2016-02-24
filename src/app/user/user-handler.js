var express = require('express');
var db = require('mongoose');
var bodyParser = require('body-parser');
var config = require('../config.json');
var hashService = require('../encryption/hash-service')();
var saltService = require('../encryption/salt-service')();
var User = require('./user-model');

module.exports = () => {
    var app = express();
    
    app.use(bodyParser.json());
    
    app.get('/', (req, res) => {
        res.status(302).send({ username: 'test@test.com' });
    });
    
    app.get('/ranks', (req, res) => {
        res.status(302).send([{ name: 'purple' }]);
    });
    
    app.get('/friends', (req, res) => {
        res.status(302).send([{ username: 'friend@test.com'}]);
    });
    
    app.post('/', (req, res) => {           
        var user = new User(req.body);
        user.password = hashService.hashValue(user.password);
        user.salt = saltService.getSalt();
        user.password = hashService.hashValue(`${user.password}${user.salt}`);
        
        db.connect(config.db.url);
           
        user.save(err => {
            db.connection.close();
            
            if (err) {
                if (err.code === 11000) {
                    res.status(409).end();
                }
            }
            
            res.status(201).end();
        });
    });
    
    app.put('/', (req, res) => {
        res.status(200).end();
    });
    
    return app;
};
