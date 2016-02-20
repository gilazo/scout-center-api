var express = require('express');
var app = express();
var config = require('./config.json');

app.listen(config.server.port, () => {
    console.log('listening on port %s', config.server.port); 
});
