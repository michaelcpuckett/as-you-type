var request = require('request-json');
var express = require('express');
var app     = express();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);

var Roulette = require('./roulette');

app.get('/api/message', function (request, response, next) {
    new Roulette(response, false);

    var data = {
        "username": "mpuckett"
    };

    response.end(JSON.stringify(data));
});

app.post('/api/message', function (request, response, next) {
    new Roulette(response, false);

    var data = {
        "success": true
    };

    response.end(JSON.stringify(data));
});

app.use(express.static('./static'));
app.use('/third-party', express.static('./bower_components'));

io.on('connection', function(socket){
    socket.on('chat message', function(msg) {
        socket.broadcast.emit('chat message', msg);
    });
});

http.listen(3000, function() {
    console.log(new Date(), 'started server');
});
