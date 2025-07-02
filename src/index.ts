import { color } from 'console-log-colors';
var display = require('./display');

console.clear();
console.log(color.green.bold("Booting up the script..."))

var init_status: string | boolean = false;
checkDisplay();

console.log(color.green.bold("Loaded!"))

setInterval(function () {
    console.clear();
    if (init_status != true) {
        console.log("update");
    } else {
        var upd_status: string | boolean = display.update("brits :x:")
        console.log(upd_status);
    }
}, 1000);

function checkDisplay() {
    if (init_status == true || init_status == "Not running on RPI") return;

    init_status = display.init("PCF8574T");
    if (init_status != true) {
        console.log(color.red.underline("Error initializing display:") + " " + color.red.bold(init_status));
    }

    if (init_status == true || init_status == "Not running on RPI") return;
    setTimeout(function () {
        checkDisplay();
    }, 60000);
}

checkDisplay();