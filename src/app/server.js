var config = require('./config.json');
var mongoose = require('mongoose');
var app = require('./app')();

mongoose.connect(config.db.url, () => {
    console.log('connected to mongo at %s', config.db.url);
    
    app.listen(config.server.port, () => {
        console.log('listening on port %s', config.server.port);    
    });
});
