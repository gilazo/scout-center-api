var express = require('express');
var app = express();
var config = require('./config.json');
var userRouter = require('./user/user-router')();
var rankRouter = require('./rank/rank-router')();

app.use('/user', userRouter);
app.use('/ranks', rankRouter);

app.listen(config.server.port, () => {
    console.log('listening on port %s', config.server.port); 
});
