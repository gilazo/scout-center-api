var express = require('express');
var bodyParser = require('body-parser');
var repository = require('./user-repository')();

module.exports = () => {
    var app = express();
    
    app.use(bodyParser.json());
    
    app.get('/', (req, res) => {
        repository
            .getUser(req.username, user => {                
                res.status(302).send(user);
            });
    });
    
    app.get('/ranks', (req, res) => {
        repository
            .getUserRanks(req.id, ranks => {
                res.status(302).send(ranks);         
            });
    });
    
    app.get('/friends', (req, res) => {
        repository
            .getUsers(req.id, friends => {
                res.status(302).send(friends);
            });
    });
    
    app.post('/', (req, res) => {
        repository
            .addUser(req.body, err => {
                if (err) res.status(500).send();
                
                res.status(201).send();
            });
    });
    
    app.put('/', (req, res) => {
        repository
            .updateUser(req.body, err => {
                if (err) res.status(400).send();
                
                res.status(200).send();
            });
    });
    
    return app;
};
