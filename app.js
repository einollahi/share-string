const express = require('express');
const path = require('path');
const app = express();
const socket = require('socket.io');

const connection = {
	sendMessage: 'SendMessage',
};

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	next();
});

app.use(express.static(path.join(__dirname, 'client')));

const server = app.listen(process.env.PORT || 3000, () => {
	console.log('server is listenning in port 3000');
});

const io = socket(server, {
	cors: {
		origin: 'http://localhost:4200',
		methods: ['GET', 'POST'],
	},
});

io.on('connection', (socket) => {
	socket.on(connection.sendMessage, (message) => {
		console.log(`>> ${socket.id} is inputing text`);
		io.sockets.emit(connection.sendMessage, message);
	});
});
