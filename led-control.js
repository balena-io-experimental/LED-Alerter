// import 'onoff' package
const { Gpio } = require( 'onoff' );

// configure LED pins
const pin_red = new Gpio( 26, 'out' );
const pin_yellow = new Gpio( 19, 'out' );
const pin_green = new Gpio( 13, 'out' );
const pin_buzz = new Gpio( 6, 'out' );

// set to logic level that turns on LEDs
const pin_high = Gpio.LOW;
const pin_low = Gpio.HIGH;

// toggle LED states
exports.toggle = ( c, b ) => {

  pin_buzz.writeSync( b ? pin_high : pin_low );

  if( c == 'r') {
    pin_red.writeSync( pin_high );
    sleep(500);
    pin_red.writeSync( pin_low );
    sleep(500);
    pin_red.writeSync( pin_high );
    sleep(500);
    pin_red.writeSync( pin_low );
    sleep(500);
    pin_red.writeSync( pin_high );
    pin_yellow.writeSync( pin_low );
    pin_green.writeSync(  pin_low );
  }

  if( c == 'y') { 
    pin_yellow.writeSync( pin_high );
    sleep(500);
    pin_yellow.writeSync( pin_low );
    sleep(500);
    pin_yellow.writeSync( pin_high );
    sleep(500);
    pin_yellow.writeSync( pin_low );
    sleep(500);
    pin_yellow.writeSync( pin_high );
    pin_red.writeSync( pin_low );
    pin_green.writeSync( pin_low );
  }
    
  if( c == 'g') { 
    pin_red.writeSync( pin_low );
    pin_yellow.writeSync( pin_low );
    pin_green.writeSync( pin_high );
    sleep(1000);
  }

  pin_buzz.writeSync(1);

};

// read LED states
exports.red_led_state = ( ) => {


  return myXNOR(pin_high, pin_red.readSync());

};

exports.yellow_led_state = ( ) => {
  
  return myXNOR(pin_high, pin_yellow.readSync());

};

exports.green_led_state = ( ) => {
  
  return myXNOR(pin_high, pin_green.readSync());

};

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

// simple exclusive NOR function
function myXNOR(a,b) {
  return ( a === b );
}
