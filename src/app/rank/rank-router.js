var express = require('express');
var bodyParser = require('body-parser');
var repository = require('./rank-repository')();

module.exports = () => {
    var app = express();
    
    app.use(bodyParser.json());
    
    app.get('/', (req, res) => {
        repository.getRanks(ranks => {
            res.status(302).send(ranks);
        });
    });
    
    return app;  
};
