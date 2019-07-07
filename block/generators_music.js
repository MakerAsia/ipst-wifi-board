const notes = [
  "SIL",
  "C2", "C#2", "D2", "D#2", "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2",
  "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3",
  "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4",
  "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5",
  "C6", "C#6", "D6", "D#6", "E6", "F6", "F#6", "G6", "G#6", "A6", "A#6", "B6"
];

module.exports = function(Blockly) {
  "use strict";
  const ORDER_ATOMIC = Blockly.JavaScript.ORDER_ATOMIC;
  const ORDER_NONE = Blockly.JavaScript.ORDER_NONE;
  const valueToCode = (a, b) => Blockly.JavaScript.valueToCode(a, b);

  Blockly.JavaScript["speaker_play_note"] = function(block) {
    let number_tempo = block.getFieldValue("tempo");
    let dropdown_instrument = block.getFieldValue("instrument");
    let value_note = valueToCode(block, "note", ORDER_NONE);
    let code = `
#EXTINC#include <KBSound.h>#END
#VARIABLEKBSound kbsound;#END
#SETUP kbsound.begin(0);#END
kbsound.playNotes(${dropdown_instrument},${value_note},${number_tempo});
`;
    return code;
  };

  Blockly.JavaScript["speaker_music_note"] = function(block) {
    let text_notes = block.getFieldValue("notes")
      .split(",")
      .map(e => e.trim());
    let keyNote = text_notes.map(e => {
      let ind = notes.indexOf(e);
      if (ind === 0) { return -1;}
      return ind + 34; //should minus 2 key start at 0 and note started at 1
    });
    let code = `(std::vector<int>{${keyNote}})`;
    return [code, ORDER_NONE];
  };

  Blockly.JavaScript["speaker_tts_speak"] = function(block) {
    let value_words = valueToCode(block, "words", ORDER_NONE);
    //language=CPP
    let code = `
#EXTINC#include <tts.h>#END
#EXTINC#include <KBSound.h>#END
#VARIABLEKBSound kbsound;#END
#SETUP kbsound.begin(0);#END
kbsound.speak(${value_words});
`;
    return code;
  };

  Blockly.JavaScript["speaker_tts_speak_number"] = function(block) {
    let value_words = valueToCode(block, "number", ORDER_ATOMIC);
    var code = `
#EXTINC#include <tts.h>#END
#EXTINC#include <KBSound.h>#END
#VARIABLEKBSound kbsound;#END
#SETUP kbsound.begin(0);#END
kbsound.speak(${value_words});
`;
    return code;
  };
  Blockly.JavaScript["speaker_set_volume"] = function(block) {
    var number_volume = block.getFieldValue("volume");
    var code = `
#EXTINC#include <KBSound.h>#END
#VARIABLEKBSound kbsound;#END
kbsound.setVolume(${number_volume});
`;
    return code;
  };

  Blockly.JavaScript["speaker_get_volume"] = function(block) {
    var code = `#EXTINC#include <KBSound.h>#END#VARIABLEKBSound kbsound;#ENDkbsound.getVolume(${value_words});`;
    return [code, ORDER_ATOMIC];
  };

// =============================================================================
// music
// =============================================================================
  Blockly.JavaScript["music_begin"] = function(block) {
    var code =
      `
#VARIABLE
#define BUZZER_PIN          25 
#define SOUND_PWM_CHANNEL   0 
#define SOUND_RESOLUTION    8
#define SOUND_ON            (1<<(SOUND_RESOLUTION-1))
#define SOUND_OFF           0 

void tone(int pin, int frequency, int duration) {
  ledcSetup(0, frequency, 8);
  ledcAttachPin(pin, 0);
  ledcWrite(0, SOUND_ON);
  delay(duration);
  ledcWrite(0, SOUND_OFF);
}
#END
  `;
    return code;
  };

  Blockly.JavaScript["music_buzzer_note"] = function(block) {
    var value_tone = block.getFieldValue("NOTE");
    var value_dulation = block.getFieldValue("DURATION");
    var code = ` tone(BUZZER_PIN, ${value_tone}, ${value_dulation}); `;
    return code;
  };

  Blockly.JavaScript["music_buzzer_frequency"] = function(block) {
    var value_frequency = valueToCode(block, "FREQUENCY", ORDER_ATOMIC);
    var value_dulation = valueToCode(block, "DURATION", ORDER_ATOMIC);
    var code = ` tone(BUZZER_PIN, ${value_frequency}, ${value_dulation}); `;
    return code;
  };

  Blockly.JavaScript["music_rest"] = function(block) {
    return "sound.rest(" + block.getFieldValue("DURATION") + ");\n";
  };

  Blockly.JavaScript["music_scale"] = function(block) {
    var ret =
      "sound.note(" + block.getFieldValue("NOTE") + ");\n" +
      "sound.rest(" + block.getFieldValue("DURATION") + ");\n" +
      "sound.off();\n";

    return ret;
  };

  Blockly.JavaScript["music_set_volume"] = function(block) {
    return "sound.set_volume(" + block.getFieldValue("VALUE") + ");\n";
  };

  Blockly.JavaScript["music_get_volume"] = function(block) {
    return ["sound.get_volume()", ORDER_ATOMIC];
  };

  Blockly.JavaScript["music_set_tempo"] = function(block) {
    return "sound.set_bpm(" + block.getFieldValue("VALUE") + ");\n";
  };
// =============================================================================
};
