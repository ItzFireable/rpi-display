const { RaspiIO } = require("raspi-io");
const five = require("johnny-five");

const board = new five.Board({
    io: new RaspiIO()
});

board.on("ready", function () {
    const lcd = new five.LCD({
        controller: "PCF8574T"
    });

    lcd.useChar("x");
    lcd.cursor(0, 0);
    lcd.print("brits :x:");
});