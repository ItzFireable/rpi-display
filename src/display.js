const five = require("johnny-five");
var RaspiIO;

var board;
var lcd;

function parseChars(str) {
    const regex = new RegExp(/:([^\:]*)\:/g);
    const chars = str.match(regex);
    let output = [];

    if (chars != null)
        for (const char of chars)
            output.push(char.replaceAll(":", ''));

    return output;
}

module.exports = {
    init: function (controller) {
        try {
            RaspiIO = require("raspi-io").RaspiIO;
        } catch (ex) {
            console.log(ex);
            return "Not running on RPI";
        }

        board = new five.Board({
            io: new RaspiIO()
        });

        if (!board) return "No board connected!";

        board.on("ready", function () {
            lcd = new five.LCD({
                controller: controller
            });
        });

        return true;
    },
    update: function (str) {
        if (!lcd) return false, "No LCD connected!";

        let usedChars = parseChars(str);
        for (const char in usedChars)
            lcd.useChar(char);

        lcd.cursor(0, 0);
        lcd.print(str);
    }
};