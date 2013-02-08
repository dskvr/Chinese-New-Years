
/**
 * Module dependencies.
 */

var express = require('express'),
	 routes = require('./routes'),
	 socket = require('./routes/http-socket.js'),
	 socketTcp = require('./routes/tcp-socket-arduino.js');

var app = module.exports = express();

	 server = require('http').createServer(app);
	 httpGuests = [];

	 serverTcp = require('net').createServer();
	 tcpGuests = [];
  	 buffer = [];

// Hook Socket.io into Express
var io = require('socket.io').listen(server);
var ioTCP = require('socket.io').listen(serverTcp);

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});

//Development
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

//Production
app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Socket.io Communication
io.sockets.on('connection', socket);

// TCP Socket
serverTcp.on('connection', socketTcp);

// Start servers
server.listen(8090, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

serverTcp.listen(1337, function(){
	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});	