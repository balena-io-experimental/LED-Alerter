// import 'onoff' package
const { Gpio } = require( 'onoff' );

const { env } = require('process');

// configure LED pins
// set defaults
var red_gpio = env.LED_RED_GPIO;
if (!red_gpio) {
  red_gpio = 26;
}

var yellow_gpio = env.LED_YELLOW_GPIO;
if (!yellow_gpio) {
  yellow_gpio = 19;
}

var green_gpio = env.LED_GREEN_GPIO;
if (!green_gpio) {
  green_gpio = 13;
}

var buzz_gpio = env.LED_BUZZ_GPIO;
if (!buzz_gpio) {
  buzz_gpio = 6;
}

var connect_gpio = env.LED_CONNECT_GPIO;
if (!connect_gpio) {
  connect_gpio = 5;
}

const pin_red = new Gpio( red_gpio, 'out' );
const pin_yellow = new Gpio( yellow_gpio, 'out' );
const pin_green = new Gpio( green_gpio, 'out' );
const pin_buzz = new Gpio( buzz_gpio, 'out' );
const pin_connect = new Gpio( connect_gpio, 'out' );

// set to logic level that turns on LEDs
var my_high = Gpio.LOW;
var my_low = Gpio.HIGH;
if (env.LED_RELAY_HIGH == 1) {
  my_high = Gpio.HIGH;
  my_low = Gpio.LOW;
} 
const pin_high = my_high;
const pin_low = my_low;

// change LED state
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

// Connection LED
exports.led_connect = ( c ) => {

  if( c == 1 ) {
    pin_connect.writeSync( Gpio.HIGH );
  } else {
    pin_connect.writeSync( Gpio.LOW );
  }
}

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
