const path = require( 'path' );
const express = require( 'express' );
const socketIO = require( 'socket.io' );
const {env} = require('process');


var uuid = env.RESIN_DEVICE_UUID;
var device = env.LED_MY_NAME;
if (!device) {
  device = env.BALENA_DEVICE_NAME_AT_INIT;
}

var red_label = env.LED_RED_LABEL;
if (!red_label) {
  red_label = 'Red';
}

var yellow_label = env.LED_YELLOW_LABEL;
if (!yellow_label) {
  yellow_label = 'Yellow';
}

var green_label = env.LED_GREEN_LABEL;
if (!green_label) {
  green_label = 'Green';
}

console.log(uuid);

// import LED control API
const { toggle } = require( './led-control' );
const { red_led_state } = require( './led-control' );
const { yellow_led_state } = require( './led-control' );
const { green_led_state } = require( './led-control' );

// create an express app
const app = express();

// send 'index.html' from the current directory
// when 'http://<ip>/' route is accessed using 'GET' method
app.get( '/', ( request, response ) => {
  response.sendFile( path.resolve( __dirname, 'web-app/index.html' ), {
    headers: {
      'Content-Type': 'text/html',
    }
  } );
} );

// send asset files
app.use( '/assets/', express.static( path.resolve( __dirname, 'web-app' ) ) );
app.use( '/assets/', express.static( path.resolve( __dirname, 'node_modules/socket.io-client/dist' ) ) );

// server listens on port 80
const server = app.listen( 80, () => console.log( 'Express server started!' ) );

// set initial LED state
toggle( 'g', 0 );

// create a WebSocket server
const io = socketIO( server );

// listen for connection
io.on( 'connection', ( client ) => {
  console.log( 'SOCKET: ', 'A client connected', client.id );
  client.emit('intro', { message: uuid, id: client.id, devname: device, r_label: red_label, y_label: yellow_label, g_label: green_label });
  client.emit('led-status', { r: red_led_state(), y: yellow_led_state(), g: green_led_state() }); // transmit the LED status to this client

  // listen to `led-toggle` event
  client.on( 'led-toggle', ( data ) => {
    console.log( 'Received led-change event.' );
    toggle( data.c, data.b ); // change LEDs
    io.emit('led-status', { r: red_led_state(), y: yellow_led_state(), g: green_led_state() }); // transmit the LED status back to all clients
  } );


} );
