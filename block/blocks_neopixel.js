module.exports = function(Blockly) {
  "use strict";
  Blockly.Blocks["neopixel_rgb_begin"] = {
    init: function() {
      this.appendDummyInput().appendField("NeoPixel begin");
      this.appendValueInput("PIN").setCheck("Number").appendField("Pin");
      this.appendValueInput("NUM").
      setCheck("Number").
      appendField("Number of Pixels");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };

  Blockly.Blocks["neopixel_rgb_clear"] = {
    init: function() {
      this.appendDummyInput().appendField("NeoPixel Clear");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };

  Blockly.Blocks["neopixel_rgb_show"] = {
    init: function() {
      this.appendDummyInput().appendField("NeoPixel Show");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };

  Blockly.Blocks["neopixel_rgb_setBrightness"] = {
    init: function() {
      this.appendValueInput("BRIGHT").
      setCheck("Number").
      appendField("NeoPixel setBrightness (0-255)");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };

  Blockly.Blocks["neopixel_rgb_setPixelColor"] = {
    init: function() {
      this.appendValueInput("NUM").
      setCheck("Number").
      appendField("NeoPixel set Pixel");
      this.appendDummyInput().
      appendField("Color").
      appendField(new Blockly.FieldColour("#FFFFFF"), "COLOR");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };

  Blockly.Blocks["neopixel_rgb_fillLED"] = {
    init: function() {
      this.appendDummyInput().
      appendField("NeoPixel fill all LED color").
      appendField(new Blockly.FieldColour("#FFFFFF"), "COLOR");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };

  Blockly.Blocks["neopixel_rgb_colorWipe"] = {
    init: function() {
      this.appendDummyInput().
      appendField("NeoPixel colorWipe").
      appendField(new Blockly.FieldColour("#FFFFFF"), "COLOR");
      this.appendValueInput("TIME").setCheck("Number").appendField("Time(ms)");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };

  Blockly.Blocks["neopixel_rgb_theaterChase"] = {
    init: function() {
      this.appendDummyInput().
      appendField("NeoPixel theaterChase").
      appendField(new Blockly.FieldColour("#FFFFFF"), "COLOR");
      this.appendValueInput("TIME").setCheck("Number").appendField("Time(ms)");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };

  Blockly.Blocks["neopixel_rgb_rainbow_begin"] = {
    init: function() {
      this.appendDummyInput().appendField("NeoPixel rainbow Begin");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };

  Blockly.Blocks["neopixel_rgb_rainbow"] = {
    init: function() {
      this.appendValueInput("TIME").
      setCheck("Number").
      appendField("NeoPixel rainbow Time(ms)");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };

  Blockly.Blocks["neopixel_rgb_rainbowCycle"] = {
    init: function() {
      this.appendValueInput("TIME").
      setCheck("Number").
      appendField("NeoPixel rainbowCycle Time(ms)");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };

// ######################################################################
};
