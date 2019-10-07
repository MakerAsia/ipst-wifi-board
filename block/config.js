let display = require("./menu/config.group.display");
let neopixel = require("./menu/config.group.neopixel");
let buzzer = require("./menu/config.group.buzzer");
// let common = require("./menu/config.group.common");
let gpio = require("./menu/config.group.gpio");
let sdcard = require("./menu/config.group.sdcard");

module.exports = {
  //language=HTML format=false
  blocks: [
    gpio,
    display,
    neopixel,
    buzzer,
    sdcard,
    {
      override : true,
      name: "Time",
      index: 50,
      color: "230",
      icon: "/static/icons/icons8_Story_Time_96px.png",
      blocks: [
          {
              xml:
                  `<block type="time_delay">
                        <value name="delay">
                            <shadow type="math_number">
                                <field name="NUM">1000</field>
                            </shadow>
                        </value>
                    </block>`
          },
          {
              xml:
                  `<block type="time_delay_microsec">
                        <value name="delay">
                            <shadow type="math_number">
                                <field name="NUM">1000</field>
                            </shadow>
                        </value>
                    </block>`
          },
          "time_millis",
          "time_micros"
      ]
  },
  ],
};
