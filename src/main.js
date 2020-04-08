// get button elements
var button_red = document.getElementById( 'button-red' );
var button_green = document.getElementById( 'button-green' );
var button_yellow = document.getElementById( 'button-yellow' );
var check_buzz = document.getElementById( 'check-buzz' );

var red_label;
var yellow_label;
var green_label;

// check for active connection
var isConnectionActive = false;

// connect to the Web Socket server
var connection = io( );

// when connection is established
connection.on( 'connect', () => {
  isConnectionActive = true;
} );

connection.on( 'disconnect', () => {
  isConnectionActive = false;
} );

connection.on( 'intro', ( data ) => {
  document.getElementById('myuuid').innerHTML = 'Device ID: ' + data.message.substring(0, 7);
  document.getElementById('topline').innerHTML = data.devname;
  red_label = data.r_label;
  green_label = data.g_label;
  yellow_label = data.y_label;
  restore_labels(red_label, yellow_label, green_label);
  
} );

connection.on( 'led-status', (data) => {
  restore_labels(red_label, yellow_label, green_label);
  if (data.r == true) { document.getElementById('button-red').firstChild.data = red_label + " (on!)" };
  if (data.y == true) { document.getElementById('button-yellow').firstChild.data = yellow_label + " (on!)" };
  if (data.g == true) { document.getElementById('button-green').firstChild.data = green_label + " (on!)" };
} );

// WebSocket event emitter function
var emitEvent = function( event ) {
  if( ! isConnectionActive ) {
    return alert( 'Server connection is closed!' );
  }

  // change button state
  if( event.target.id === 'button-red') { led_mode = 'r'; }
  if( event.target.id === 'button-green') { led_mode = 'g'; }
  if( event.target.id === 'button-yellow') { led_mode = 'y'; }

  // emit `led-toggle` socket event
  connection.emit( 'led-toggle', {
    c: led_mode,
    b: Number(check_buzz.checked)
  } );
};

// add event listeners on button
button_red.addEventListener( 'click', emitEvent );
button_yellow.addEventListener( 'click', emitEvent );
button_green.addEventListener( 'click', emitEvent );

function restore_labels(r, y, g) {
  document.getElementById( 'button-red' ).firstChild.data = r;
  document.getElementById( 'button-yellow' ).firstChild.data = y;
  document.getElementById( 'button-green' ).firstChild.data = g;

}
