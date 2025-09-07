var express = require('express');
var path = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// Servir archivos estáticos desde node_modules
app.use('/bootstrap', express.static(path.join(__dirname, '../node_modules/bootstrap/dist')));
app.use('/materialize', express.static(path.join(__dirname, '../node_modules/materialize-css/dist')));
app.use('/jquery', express.static(path.join(__dirname, '../node_modules/jquery/dist')));

// Servir el cliente de Socket.IO
app.use('/socket.io', express.static(path.join(__dirname, '../node_modules/socket.io/client-dist')));

// Servir archivos del cliente
app.use(express.static(path.join(__dirname, '../client')));

// Array of messages
var messages = [{
	id: 1,
	text: "Welcome to our chat.",
	nickname: "Bot - HenryLeon.com.ve"
}];

// Define the socket
io.on('connection', function (socket) {
	console.log("Un nuevo usuario se ha conectado a nuestro socket" + socket.handshake.address);

	// Historial de mensajes
	socket.emit('messages', messages);

	// Adding a new message into chat
	socket.on('add-msg', function (data) {
		messages.push(data);
		io.sockets.emit('messages', messages);
	});
});

server.listen('8000', function () {
	console.log('El servidor esta funcionando en localhost:8000');
});