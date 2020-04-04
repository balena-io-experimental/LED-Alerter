# LED-Alerter
This project is a web-controlled set of LEDs that you can use whenever you need to send a visual signal of your availability to someone in the next room (or on the other side of the world). For an in-depth tutorial on this project, check out [this blog post](https://www.balena.io/blog/build-an-led-alerter-for-your-remote-work-office-setup/).

![](https://github.com/balena-io-playground/LED-Alerter/blob/master/img/DND_lights_GIF-3.gif?raw=true)

## Hardware Required
### An elaborate build

![](https://github.com/balena-io-playground/LED-Alerter/blob/master/img/LED-traffic-light.png?raw=true)

To create a real attention-getter, you’ll want to acquire one of these industrial LED towers as your signalling device. They range in price from $20 to $35 dollars and usually include an integrated buzzer. To be consistent with the parts below, make sure you get a 12V DC tower.


Here are a couple of examples:
* [Adafruit](https://www.adafruit.com/product/2993)
* [Amazon](https://www.amazon.com/gp/product/B07DN3RH8B/ref=ppx_yo_dt_b_asin_title_o08_s00?ie=UTF8&psc=1) 
* [AliExpress](https://www.aliexpress.com/item/32958385293.html)
(Note that you can use any 12VDC LEDs in place of the tower if necessary.)

Here is the remainder of the parts list:


* A 5V 4 channel relay board or HAT: [(Amazon)](https://www.amazon.com/PiRelay-EXPANSION-RASPBERRY-Raspberry-Components/dp/B077LV4F1B/ref=sr_1_5?keywords=relay+hat&qid=1585456712&sr=8-5), [another on (Amazon)](https://www.amazon.com/JBtek-Channel-Module-Arduino-Raspberry/dp/B00KTEN3TM/ref=sr_1_7?keywords=relay+hat&qid=1585456712&sr=8-7), [or this (AliExpress)](https://www.aliexpress.com/item/32918136701.html). 
* A 12V 3A DC power supply [(Amazon)]( https://www.amazon.com/gp/product/B07VQGHSWY)
* A “female DC barrel connector” with screw terminals, if not included with power supply: [(AdaFruit)](https://www.adafruit.com/product/368), [(AliExpress)](https://www.aliexpress.com/item/4000749006888.html)
* A 12V DC/DC power converter with micro USB connector: [(AliExpress)](https://www.aliexpress.com/item/32958965769.html), [(Amazon)](https://www.amazon.com/dp/B01MEESLZ6) Or [USB-C](https://www.amazon.com/gp/product/B07ZQB6S3L/ref=ppx_yo_dt_b_asin_title_o01_s00?ie=UTF8&psc=1) for the Pi4
* [Dupont cables](https://www.amazon.com/dp/B077NH83CJ) aka “Jumper Jerky” for wiring
* Optional but recommended: Two position terminal block or barrier strip [(Amazon)](https://www.amazon.com/NTE-Electronics-25-B600-02-25-B600-Terminal/dp/B0084LH514) or [Wago connectors](https://www.aliexpress.com/item/4000801547709.html)  

Finally, we’ll need a Raspberry Pi, preferably with WiFi. The Pi Zero WH is recommended, but this project will work well with any model.

Also don’t forget an SD card; 8GB or larger should be fine. We recommend a Sandisk Extreme Pro.

### A simple build
If you’re looking for a less elaborate build you can find HATs for the Raspberry Pi that contain three LEDs (and sometimes a buzzer!) such as [this](https://shop.sb-components.co.uk/products/pitraffic), [this](https://thepihut.com/products/jam-hat), or [this](https://shop.pimoroni.com/products/pistop-traffic-light-add-on-for-raspberry-pi). While the hardware construction is reduced to one step, the tradeoff is a less visible display.

### Tinkerer build
For those that have spare parts lying around, you could build this project on a breadboard with:
* Three LEDs, preferably red green and yellow, but any color will work
* Three 200 - 1000 (1k) ohm resistors
* A Raspberry Pi per the table above, along with a 5V micro USB (or USB C for Pi 4) power supply and SD card
* [Dupont cables](https://www.amazon.com/dp/B077NH83CJ) aka “Jumper Jerky” for wiring

## Software required
This project has been built to run in a Docker container on balenaCloud, so you can deploy it in only a few steps as outlined below. (For a more detailed guide, see the [blog post](https://www.balena.io/blog/build-an-led-alerter-for-your-remote-work-office-setup/).
* A download of the [project from GitHub](https://github.com/balena-io-playground/LED-Alerter)
* Software to flash the SD card ([balenaEtcher](https://www.balena.io/etcher/))
* A free [balenaCloud account]( https://dashboard.balena-cloud.com/signup) to set up and manage the Pi
* A download and installation of the [balenaCLI](https://github.com/balena-io/balena-cli/blob/master/INSTALL.md) to be installed on your development computer used to push code to the cloud

## Set up the hardware
If you opted for the easier build, your setup is simply to attach the LED HAT to your Raspberry Pi using the instructions provided with the HAT. There may be some jumpers to set the GPIO pins, but you can probably leave those in their default position. Just note the GPIO number that is assigned to each LED and the buzzer; we’ll need that information for the software setup in the next section.

![](https://github.com/balena-io-playground/LED-Alerter/blob/master/img/wiring-diagram.png?raw=true)

Using the wiring diagram above as an overall guide, first make the connections between your Raspberry Pi pins and relay board. (If you have a relay HAT, you merely need to attach the HAT instead.) 

Next, connect your LEDs to the relay board. The positive leads from the LEDs connect to the normally open (N.O.) terminals on the relay board. All of the negative leads should be connected together. If you are using the LED tower, all of the negative leads have already been connected together inside the tower, and only that common wire needs to be connected to your -12V jack or terminal block. If you have a buzzer, connect that to the remaining relay.

Now connect the positive lead from your 12V power supply jack to the middle position on each relay. You could connect all of the center relay terminals together or wire each one to the positive +12V supply separately.

Finally, connect the power converter’s 12V leads to your 12V power terminals or jack. The 5V wire coming from the converter should be connected to the power jack on the Raspberry Pi. If your converter does not have a micro USB output, attach the proper adapter first.

Your project should now be wired and ready to go; make one last check against the diagram, but don’t plug in the power supply just yet.


## Set up the software
The balenaCloud platform will take care of providing a lightweight OS for your device as well as deploying the web application so just follow along with the steps below on your development computer (not on your Raspberry Pi). Follow these steps regardless of whether you assembled the elaborate tower or are using an LED HAT.

## Configuration and use
If you followed the wiring diagram and “elaborate” build steps above, you should see the green LED light up a few minutes after you push the code. If not, go ahead and re-check all of your connections and software setup steps.

If you used an LED HAT or different GPIO pins than the ones in the instructions, (or a Raspberry Pi 1A or 1B) you’ll need to set a few device variables in the balenaCloud dashboard. This feature of balenaCloud frees us from having to edit any code or configuration files on the device. 

To set device variables, first click on the “D(x) Device Variables” block on the left side of the dashboard. Then click the “+ Add variable” button to open the Add variable window.

If you used different GPIO pins than the default ones below, you’ll need to add the specified device variable and value. Note: It’s likely that any HAT will not use these default values.


| Variable Name | Description | Default Value |
| ------------- | ----------- | ------------- |
| `LED_RED_GPIO` | GPIO # used for red LED | 26 |
| `LED_YELLOW_GPIO` | GPIO # used for yellow LED | 19 |
| `LED_GREEN_GPIO` | GPIO # used for green LED | 13 |
| `LED_BUZZ_GPIO` | GPIO # used for the buzzer | 6 |

In the “Add variable” window, you can add one variable and its value at a time. Click “Add” after each variable and then repeat the steps to add as many of the variables that apply to your setup. Note that each time you add or change a variable, the application will restart and then apply the new value.

Another important device variable has to do with the type of output state that your relay board or HAT uses to turn on the LEDs. The popular relay board specified in the parts list has a somewhat reversed logic, where a “high” state actually turns off the LEDs. This is the default value in the software but you can easily change it by setting the `LED_RELAY_HIGH` variable to a value of `1`. If your LEDs act the opposite of what you expect or more than one turns on simultaneously, it is a safe bet you need to set this variable. If you need to revert back to the default logic, set the variable to `0` or delete it.

On the balenaCloud dashboard, find your device’s local IP address and click the icon next to it to copy to your clipboard. Paste that into another browser window to access the device’s LED Alerter web page. If you want to instantly access your LED Alerter page from anywhere in the world, enable the “Public Device URL” (right under the IP address) and click the icon next to that to open it in another browser window. The device URL is listed in the address bar of the browser window.

You can customize the look of your LED Alerter web page by setting the following device variables:


| Device variable name | Description | Default value if not set |
| -------------------- | ----------- | ------------------------ |
|`LED_MY_NAME` | Name of device displayed above the buttons | Device name on dashboard (which you can change using the pencil icon) |
| `LED_RED_LABEL` | Label on red button | red |
| `LED_YELLOW_LABEL` | Label on yellow button | yellow |
| `LED_GREEN_LABEL` | Label on green button | green |


A button will display “(On!)” if that color LED is currently lit. This can be useful when multiple people are using the same LED Alerter webpage to control the LEDs. The on/off status will update in real time.


## Taking it further
The LED Alerter can be enhanced with many features to make it even more useful for letting others know when you are busy or don’t want to be disturbed. It could be synced to a calendar for automatic operation. Another possibility is to link it with e-mail or chat to trigger LED changes. The project is [fully open source](https://github.com/balena-io-playground/LED-Alerter) and we welcome any contributions from the community to help improve it; no matter if it’s submitting a bug report, a feature request or even a PR with new code. The balenaCloud platform is optimized for fleet operations, so having one Alerter control many devices or controlling many devices with one Alerter would be an interesting feature to implement.


