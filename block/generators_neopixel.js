module.exports = function(Blockly){
  'use strict';

Blockly.JavaScript['neopixel_rgb_begin'] = function(block) {
  var value_pin = Blockly.JavaScript.valueToCode(block, 'PIN', Blockly.JavaScript.ORDER_ATOMIC);
  var value_num = Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_ATOMIC);

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

Blockly.JavaScript['neopixel_rgb_clear'] = function(block) {
  var code = 
  `
  for(int clearPixel = 0; clearPixel < pixels.numPixels(); clearPixel++) {
    pixels.setPixelColor(clearPixel, pixels.Color(0,0,0));
  	pixels.show();
  }
  `;
	return code;
};

Blockly.JavaScript['neopixel_rgb_setBrightness'] = function(block) {
  var value_bright = Blockly.JavaScript.valueToCode(block, 'BRIGHT', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 
  `
  pixels.setBrightness(${value_bright});
  pixels.show();
  `;
	return code;
};

Blockly.JavaScript['neopixel_rgb_setPixelColor'] = function(block) {
  var value_num = Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_ATOMIC);
  var value_color = block.getFieldValue('COLOR');
  var color = hexToRgbA(value_color);
  var colorArr = color.split(',');
  var value_r = colorArr[0];
  var value_g = colorArr[1];
  var value_b = colorArr[2];

  var code = 
  `
  pixels.setPixelColor(${value_num}, pixels.Color(${value_r}, ${value_g}, ${value_b}));
  pixels.show();
  `;
  return code;
};

Blockly.JavaScript['neopixel_rgb_fillLED'] = function(block) {
  var value_color = block.getFieldValue('COLOR');
  var color = hexToRgbA(value_color);
  var colorArr = color.split(',');
   var value_r = colorArr[0];
   var value_g = colorArr[1];
   var value_b = colorArr[2];

  var code = 
  `
  for (uint16_t i = 0; i < pixels.numPixels(); i++) {
    pixels.setPixelColor(i, pixels.Color(${value_r}, ${value_g}, ${value_b}));
  }
  pixels.show();
  `;
  return code;
};

Blockly.JavaScript['neopixel_rgb_colorWipe'] = function(block) {
  var value_time = Blockly.JavaScript.valueToCode(block, 'TIME', Blockly.JavaScript.ORDER_ATOMIC);
  var value_color = block.getFieldValue('COLOR');
  var color = hexToRgbA(value_color);
  var colorArr = color.split(',');
   var value_r = colorArr[0];
   var value_g = colorArr[1];
   var value_b = colorArr[2];

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

Blockly.JavaScript['neopixel_rgb_theaterChase'] = function(block) {
  var value_time = Blockly.JavaScript.valueToCode(block, 'TIME', Blockly.JavaScript.ORDER_ATOMIC);
  var value_color = block.getFieldValue('COLOR');
  var color = hexToRgbA(value_color);
  var colorArr = color.split(',');
   var value_r = colorArr[0];
   var value_g = colorArr[1];
   var value_b = colorArr[2];

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

Blockly.JavaScript['neopixel_rgb_rainbow_begin'] = function(block) {
  var code = 
  `
  #VARIABLE  uint32_t Wheel(byte WheelPos) {WheelPos = 255 - WheelPos; #END
  #VARIABLE  if (WheelPos < 85) {return pixels.Color(255 - WheelPos * 3, 0, WheelPos * 3);} #END
  #VARIABLE  if (WheelPos < 170) {WheelPos -= 85;return pixels.Color(0, WheelPos * 3, 255 - WheelPos * 3);} #END
  #VARIABLE  WheelPos -= 170; return pixels.Color(WheelPos * 3, 255 - WheelPos * 3, 0);} #END
  `;
	return code;
};

Blockly.JavaScript['neopixel_rgb_rainbow'] = function(block) {
  var value_time = Blockly.JavaScript.valueToCode(block, 'TIME', Blockly.JavaScript.ORDER_ATOMIC);
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

Blockly.JavaScript['neopixel_rgb_rainbowCycle'] = function(block) {
  var value_time = Blockly.JavaScript.valueToCode(block, 'TIME', Blockly.JavaScript.ORDER_ATOMIC);

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

function hexToRgbA(hex){
  var c;
  var names;

  if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
      c= hex.substring(1).split('');
      if(c.length== 3){
          c= [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c= '0x'+c.join('');
      return [(c>>16)&255, (c>>8)&255, c&255].join(',');
  }
}
// ######################################################################
}