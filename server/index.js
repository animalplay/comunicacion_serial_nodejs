const { SerialPort, ReadlineParser } = require('serialport')

const PORT = 'COM5'         //Switch with the port in use.
const BAUDRATE = 9600       //BAUDRATE the speed at which information is transmitted.

// Create a port
const port = new SerialPort({
  path: PORT,
  baudRate: BAUDRATE,
})

// Create a parser for readLine
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }))

// Print information for testing
port.on('open', () => {
  console.log('Puerto serie abierto');
});

parser.on('data', (data) => {
  console.log(`Dato recibido: ${data}`);
});


//Print errors
port.on('error', function(err) {
  console.log('Error: ', err.message)
})

parser.on('error', function(err) {
  console.log('Error: ', err.message)
})
