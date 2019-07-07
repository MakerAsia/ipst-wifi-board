let display = require("./menu/config.group.display");
let neopixel = require("./menu/config.group.neopixel");
let buzzer = require("./menu/config.group.buzzer");
let common = require("./menu/config.group.common");
let gpio = require("./menu/config.group.gpio");

module.exports = {
  //language=HTML format=false
  initial_blocks: `<xml>
                            <block type="arduino_init" deletable="false" x="-100" y="-50"></block>
                            <block type="arduino_loop" deletable="false" x="100" y="-50"></block>
                      </xml>`,
  base_blocks: [ // use "blocks : [ " in normally situation but this need to override base block from esp-idf platforms
    gpio,
    display,
    neopixel,
    buzzer,
    ...common
  ]
};
