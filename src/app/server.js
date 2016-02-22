var config = require('./config.json');
var app = require('./app')();

app.listen(config.server.port, () => {
    console.log('listening on port %s', config.server.port);    
});
