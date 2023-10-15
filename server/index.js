// Create a server.

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/public/index.html');
// });

app.use(express.static(__dirname + '/public'));

server.listen(3000, () => {
  console.log('listening on *:3000');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

// COMUNICACION SERIAL
const { SerialPort, ReadlineParser } = require('serialport');

const PORT = 'COM5';         //Switch with the port in use.
const BAUDRATE = 9600;       //BAUDRATE the speed at which information is transmitted.

// Create a port
const port = new SerialPort({
  path: PORT,
  baudRate: BAUDRATE,
})

// Create a parser for readLine
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

// Print information for testing
port.on('open', () => {
  console.log('Puerto serie abierto');
});

parser.on('data', (data) => {
  console.log(`Dato recibido: ${data}`);
  io.emit('data', data);                          //Send information
});

//Print errors
port.on('error', function(err) {
  console.log('Error: ', err.message)
});

parser.on('error', function(err) {
  console.log('Error: ', err.message)
});
