var hexToRgbA = function(hex) {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return [(c >> 16) & 255, (c >> 8) & 255, c & 255];
  } else {
    console.error(`${hex} is invalid.`);
  }
};

//const { blockly_utils } = require("electron").remote.getGlobal("blockly_utils");
//const { hexToRgbA } = blockly_utils;

module.exports = function(Blockly) {
  "use strict";
  const ORDER_ATOMIC = Blockly.JavaScript.ORDER_ATOMIC;
  const valueToCode = (a, b) => Blockly.JavaScript.valueToCode(a, b);

  Blockly.JavaScript["neopixel_rgb_begin"] = function(block) {
    let [value_pin, value_num] = [
      valueToCode(block, "PIN", ORDER_ATOMIC),
      valueToCode(block, "NUM", ORDER_ATOMIC)
    ];

    var code =
      `
  #EXTINC#include "Adafruit_NeoPixel.h" #END
  #VARIABLE#define PIN            ${value_pin} #END
  #VARIABLE#define NUMPIXELS      ${value_num} #END

  #VARIABLEAdafruit_NeoPixel pixels = Adafruit_NeoPixel(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800); #END
  #SETUPpixels.begin(); #END
  `;
    return code;
  };

  Blockly.JavaScript["neopixel_rgb_clear"] = function(block) {
    var code =
      `
  for(int clearPixel = 0; clearPixel < pixels.numPixels(); clearPixel++) {
    pixels.setPixelColor(clearPixel, pixels.Color(0,0,0));	
    pixels.show();
  }
  
  `;
    return code;
  };

  Blockly.JavaScript["neopixel_rgb_show"] = function(block) {
    var code =
      `
  pixels.show();
  `;
    return code;
  };

  Blockly.JavaScript["neopixel_rgb_setBrightness"] = function(block) {
    var value_bright = valueToCode(block, "BRIGHT", ORDER_ATOMIC);
    var code =
      `
  pixels.setBrightness(${value_bright});
  pixels.show();
  `;
    return code;
  };

  Blockly.JavaScript["neopixel_rgb_setPixelColor"] = function(block) {
    var value_num = valueToCode(block, "NUM", ORDER_ATOMIC);
    var value_color = block.getFieldValue("COLOR");
    var color = hexToRgbA(value_color);
    if (!color) {
      console.log(`skipped`);
      return;
    }
    let [value_r, value_g, value_b] = color;

    var code =
      `
  pixels.setPixelColor(${value_num}, pixels.Color(${value_r}, ${value_g}, ${value_b}));
  pixels.show();
  `;
    return code;
  };

  Blockly.JavaScript["neopixel_rgb_fillLED"] = function(block) {
    var value_color = block.getFieldValue("COLOR");
    var color = hexToRgbA(value_color);
    if (!color) {
      console.log(`skipped`);
      return;
    }
    let [value_r, value_g, value_b] = color;

    var code =
      `
  for (uint16_t i = 0; i < pixels.numPixels(); i++) {
    pixels.setPixelColor(i, pixels.Color(${value_r}, ${value_g}, ${value_b}));
    pixels.show();
    delay(50);
  }

  `;
    return code;
  };

  Blockly.JavaScript["neopixel_rgb_colorWipe"] = function(block) {
    var value_time = valueToCode(block, "TIME", ORDER_ATOMIC);
    var value_color = block.getFieldValue("COLOR");
    var color = hexToRgbA(value_color);
    let [value_r, value_g, value_b] = color;

    var code =
      `
  for (uint16_t i = 0; i < pixels.numPixels(); i++) {
    pixels.setPixelColor(i, pixels.Color(${value_r}, ${value_g}, ${value_b}));
    pixels.show();
    delay(${value_time});
  }
  `;
    return code;
  };

  Blockly.JavaScript["neopixel_rgb_theaterChase"] = function(block) {
    var value_time = valueToCode(block, "TIME", ORDER_ATOMIC);
    var value_color = block.getFieldValue("COLOR");
    var color = hexToRgbA(value_color);
    let [value_r, value_g, value_b] = color;

    var code =
      `
  for (int j = 0; j < 10; j++) { 
    for (int q = 0; q < 3; q++) {
      for (uint16_t i = 0; i < pixels.numPixels(); i = i + 3) {
        pixels.setPixelColor(i + q, pixels.Color(${value_r}, ${value_g}, ${value_b}));
      }
      pixels.show();
      delay(${value_time});
      for (uint16_t i = 0; i < pixels.numPixels(); i = i + 3) {
        pixels.setPixelColor(i + q, 0);      
      }
      pixels.show();
    }
  }
  `;
    return code;
  };

  Blockly.JavaScript["neopixel_rgb_rainbow_begin"] = function(block) {
    var code =
      `
  #VARIABLE  uint32_t Wheel(byte WheelPos) {WheelPos = 255 - WheelPos; #END
  #VARIABLE  if (WheelPos < 85) {return pixels.Color(255 - WheelPos * 3, 0, WheelPos * 3);} #END
  #VARIABLE  if (WheelPos < 170) {WheelPos -= 85;return pixels.Color(0, WheelPos * 3, 255 - WheelPos * 3);} #END
  #VARIABLE  WheelPos -= 170; return pixels.Color(WheelPos * 3, 255 - WheelPos * 3, 0);} #END
  `;
    return code;
  };

  Blockly.JavaScript["neopixel_rgb_rainbow"] = function(block) {
    var value_time = valueToCode(block, "TIME", ORDER_ATOMIC);
    var code =
      `
  uint16_t i, j;
  for (j = 0; j < 256; j++) {
    for (i = 0; i < pixels.numPixels(); i++) {
      pixels.setPixelColor(i, Wheel((i + j) & 255));
    }
    pixels.show();
    delay(${value_time});
  }
  `;
    return code;
  };

  Blockly.JavaScript["neopixel_rgb_rainbowCycle"] = function(block) {
    var value_time = valueToCode(block, "TIME", ORDER_ATOMIC);
    var code =
      `
  uint16_t k, m;
  for (m = 0; m < 256 * 5; m++) { // 5 cycles of all colors on wheel
    for (k = 0; k < pixels.numPixels(); k++) {
      pixels.setPixelColor(k, Wheel(((k * 256 / pixels.numPixels()) + m) & 255));
    }
    pixels.show();
    delay(${value_time});
  }
  `;
    return code;
  };

// ######################################################################
};
