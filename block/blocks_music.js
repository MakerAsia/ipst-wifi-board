module.exports = function(Blockly) {
  "use strict";

  Blockly.Blocks["speaker_music_note"] = {
    init: function() {
      let f = new Blockly.FieldTextInput("C4,D4,E4");
      f.onMouseDown_ = e => {
        Blockly.music(f.getValue(), function(newNote) {
          f.setValue(newNote.join(","));
          f.init();
        });
        return e;
      };
      this.appendDummyInput()
        .appendField(
          new Blockly.FieldImage(
            "/static/icons/icons8_move_24px.png",
            30,
            30,
            "move"
          )
        )
        .appendField(f, "notes");
      this.setInputsInline(true);
      this.setOutput(true, "std::vector<int>");
      this.setColour(315);
      this.setTooltip("create music notes from B0-DS8");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks["speaker_set_volume"] = {
    init: function() {
      this.appendDummyInput()
        .appendField("set volume (0-10)")
        .appendField(new Blockly.FieldNumber(0, 0, 10), "volume");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(315);
      this.setTooltip("set speaker volume 0 = silence 10=max");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks["speaker_get_volume"] = {
    init: function() {
      this.appendDummyInput()
        .appendField("get volume");
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setColour(315);
      this.setTooltip("get speaker volume");
      this.setHelpUrl("");
    }
  };

  // =============================================================================
  // music
  // =============================================================================
  var music_colour = Blockly.Msg.MUSIC_HUE;
  // var music_colour="#FB8CC3";
  Blockly.Blocks["music_begin"] = {
    init: function() {
      this.appendDummyInput()
        .appendField(
          new Blockly.FieldImage("/static/block_icons/buzzer.png",
            30,
            30,
            "*")
        )
        .appendField("Buzzer begin");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(music_colour);
      this.setTooltip("Buzzer begin at pin 25");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks["music_duration_opt"] = [
    [
      {
        src: "/static/block_icons/notes/whole.svg",
        width: 20,
        height: 20,
        alt: "Whole"
      },
      "100"
    ],
    [
      {
        src: "/static/block_icons/notes/half.svg",
        width: 20,
        height: 20,
        alt: "Whole"
      },
      "2000"
    ],
    [
      {
        src: "/static/block_icons/notes/quarter.svg",
        width: 20,
        height: 20,
        alt: "Whole"
      },
      "1000"
    ],
    [
      {
        src: "/static/block_icons/notes/eighth.svg",
        width: 20,
        height: 20,
        alt: "Whole"
      },
      "500"
    ],
    [
      {
        src: "/static/block_icons/notes/sixteenth.svg",
        width: 20,
        height: 20,
        alt: "Whole"
      },
      "250"
    ]
  ];

  Blockly.Blocks["music_buzzer_note"] = {
    init: function() {
      this.appendDummyInput()
        .appendField(
          new Blockly.FieldImage("/static/block_icons/buzzer.png",
            30,
            30,
            "*")
        )
        .appendField("Buzzer Note")
        .appendField(
          new Blockly.FieldDropdown([
            [Blockly.Msg.MUSIC_NOTE_C7, "2093"],
            [Blockly.Msg.MUSIC_NOTE_B6, "1976"],
            [Blockly.Msg.MUSIC_NOTE_BB6, "1865"],
            [Blockly.Msg.MUSIC_NOTE_A6, "1760"],
            [Blockly.Msg.MUSIC_NOTE_GS6, "1661"],
            [Blockly.Msg.MUSIC_NOTE_G6, "1568"],
            [Blockly.Msg.MUSIC_NOTE_FS6, "1480"],
            [Blockly.Msg.MUSIC_NOTE_F6, "1397"],
            [Blockly.Msg.MUSIC_NOTE_E6, "1319"],
            [Blockly.Msg.MUSIC_NOTE_EB6, "1245"],
            [Blockly.Msg.MUSIC_NOTE_D6, "1175"],
            [Blockly.Msg.MUSIC_NOTE_CS6, "1109"],
            [Blockly.Msg.MUSIC_NOTE_C6, "1047"],
            [Blockly.Msg.MUSIC_NOTE_B5, "988"],
            [Blockly.Msg.MUSIC_NOTE_BB5, "932"],
            [Blockly.Msg.MUSIC_NOTE_A5, "880"],
            [Blockly.Msg.MUSIC_NOTE_GS5, "831"],
            [Blockly.Msg.MUSIC_NOTE_G5, "784"],
            [Blockly.Msg.MUSIC_NOTE_FS5, "740"],
            [Blockly.Msg.MUSIC_NOTE_F5, "698"],
            [Blockly.Msg.MUSIC_NOTE_E5, "659"],
            [Blockly.Msg.MUSIC_NOTE_EB5, "622"],
            [Blockly.Msg.MUSIC_NOTE_D5, "587"],
            [Blockly.Msg.MUSIC_NOTE_CS5, "554"],
            [Blockly.Msg.MUSIC_NOTE_C5, "523"],
            [Blockly.Msg.MUSIC_NOTE_B4, "494"],
            [Blockly.Msg.MUSIC_NOTE_BB4, "466"],
            [Blockly.Msg.MUSIC_NOTE_A4, "440"],
            [Blockly.Msg.MUSIC_NOTE_GS4, "415"],
            [Blockly.Msg.MUSIC_NOTE_G4, "392"],
            [Blockly.Msg.MUSIC_NOTE_FS4, "370"],
            [Blockly.Msg.MUSIC_NOTE_F4, "349"],
            [Blockly.Msg.MUSIC_NOTE_E4, "330"],
            [Blockly.Msg.MUSIC_NOTE_EB4, "311"],
            [Blockly.Msg.MUSIC_NOTE_D4, "294"],
            [Blockly.Msg.MUSIC_NOTE_CS4, "277"],
            [Blockly.Msg.MUSIC_NOTE_C4, "262"]
          ]),
          "NOTE"
        );
      this.appendDummyInput()
        .appendField(Blockly.Msg.MUSIC_NOTE_DURATION)
        .appendField(
          new Blockly.FieldDropdown(Blockly.Blocks["music_duration_opt"]),
          "DURATION"
        );
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(music_colour);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks["music_buzzer_frequency"] = {
    init: function() {
      this.appendValueInput("FREQUENCY")
        .appendField(new Blockly.FieldImage("/static/block_icons/buzzer.png",30,30,"*"))
        .setCheck("Number")
        .appendField("Buzzer Frequency");
      this.appendValueInput("DURATION")
        .setCheck("Number")
        .appendField("Duration");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(music_colour);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks["music_rest"] = {
    init: function() {
      this.appendDummyInput()
        .appendField(
          new Blockly.FieldImage("/static/block_icons/buzzer.png",
            30,
            30,
            "*")
        )
        .appendField(Blockly.Msg.MUSIC_REST_TITLE)
        .appendField(Blockly.Msg.MUSIC_NOTE_DURATION)
        .appendField(
          new Blockly.FieldDropdown(Blockly.Blocks["music_duration_opt"]),
          "DURATION"
        );
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(music_colour);
      this.setTooltip(Blockly.Msg.MUSIC_NOTE_TOOLTIP);
      this.setHelpUrl(Blockly.Msg.MUSIC_NOTE_HELPURL);
    }
  };

  // https://online-musical-scales.com/c-major-scale
  // https://online-musical-scales.com/c-minor-scale
  Blockly.Blocks["music_scale_opt"] = [
    [
      // C Maj
      [Blockly.Msg.MUSIC_NOTE_C7, "36"],
      [Blockly.Msg.MUSIC_NOTE_B6, "35"],
      [Blockly.Msg.MUSIC_NOTE_A6, "33"],
      [Blockly.Msg.MUSIC_NOTE_G6, "31"],
      [Blockly.Msg.MUSIC_NOTE_F6, "29"],
      [Blockly.Msg.MUSIC_NOTE_E6, "28"],
      [Blockly.Msg.MUSIC_NOTE_D6, "26"],
      [Blockly.Msg.MUSIC_NOTE_C6, "24"],
      [Blockly.Msg.MUSIC_NOTE_B5, "23"],
      [Blockly.Msg.MUSIC_NOTE_A5, "21"],
      [Blockly.Msg.MUSIC_NOTE_G5, "19"],
      [Blockly.Msg.MUSIC_NOTE_F5, "17"],
      [Blockly.Msg.MUSIC_NOTE_E5, "16"],
      [Blockly.Msg.MUSIC_NOTE_D5, "14"],
      [Blockly.Msg.MUSIC_NOTE_C5, "12"],
      [Blockly.Msg.MUSIC_NOTE_B4, "11"],
      [Blockly.Msg.MUSIC_NOTE_A4, "9"],
      [Blockly.Msg.MUSIC_NOTE_G4, "7"],
      [Blockly.Msg.MUSIC_NOTE_F4, "5"],
      [Blockly.Msg.MUSIC_NOTE_E4, "4"],
      [Blockly.Msg.MUSIC_NOTE_D4, "2"],
      [Blockly.Msg.MUSIC_NOTE_C4, "0"]
    ],
    [
      // C Minor
      [Blockly.Msg.MUSIC_NOTE_C7, "36"],
      [Blockly.Msg.MUSIC_NOTE_BB6, "34"],
      [Blockly.Msg.MUSIC_NOTE_GS6, "32"],
      [Blockly.Msg.MUSIC_NOTE_G6, "31"],
      [Blockly.Msg.MUSIC_NOTE_F6, "29"],
      [Blockly.Msg.MUSIC_NOTE_EB6, "27"],
      [Blockly.Msg.MUSIC_NOTE_D6, "26"],
      [Blockly.Msg.MUSIC_NOTE_C6, "24"],
      [Blockly.Msg.MUSIC_NOTE_BB5, "22"],
      [Blockly.Msg.MUSIC_NOTE_GS5, "20"],
      [Blockly.Msg.MUSIC_NOTE_G5, "19"],
      [Blockly.Msg.MUSIC_NOTE_F5, "17"],
      [Blockly.Msg.MUSIC_NOTE_EB5, "15"],
      [Blockly.Msg.MUSIC_NOTE_D5, "14"],
      [Blockly.Msg.MUSIC_NOTE_C5, "12"],
      [Blockly.Msg.MUSIC_NOTE_BB4, "10"],
      [Blockly.Msg.MUSIC_NOTE_GS4, "8"],
      [Blockly.Msg.MUSIC_NOTE_G4, "7"],
      [Blockly.Msg.MUSIC_NOTE_F4, "5"],
      [Blockly.Msg.MUSIC_NOTE_EB4, "3"],
      [Blockly.Msg.MUSIC_NOTE_D4, "2"],
      [Blockly.Msg.MUSIC_NOTE_C4, "0"]
    ],
    [
      // C# Major
      [Blockly.Msg.MUSIC_NOTE_C7, "36"],
      [Blockly.Msg.MUSIC_NOTE_BB6, "34"],
      [Blockly.Msg.MUSIC_NOTE_GS6, "32"],
      [Blockly.Msg.MUSIC_NOTE_FS6, "30"],
      [Blockly.Msg.MUSIC_NOTE_F6, "29"],
      [Blockly.Msg.MUSIC_NOTE_EB6, "27"],
      [Blockly.Msg.MUSIC_NOTE_CS6, "25"],
      [Blockly.Msg.MUSIC_NOTE_C6, "24"],
      [Blockly.Msg.MUSIC_NOTE_BB5, "22"],
      [Blockly.Msg.MUSIC_NOTE_GS5, "20"],
      [Blockly.Msg.MUSIC_NOTE_FS5, "18"],
      [Blockly.Msg.MUSIC_NOTE_F5, "17"],
      [Blockly.Msg.MUSIC_NOTE_EB5, "15"],
      [Blockly.Msg.MUSIC_NOTE_CS5, "13"],
      [Blockly.Msg.MUSIC_NOTE_C5, "12"],
      [Blockly.Msg.MUSIC_NOTE_BB4, "10"],
      [Blockly.Msg.MUSIC_NOTE_GS4, "8"],
      [Blockly.Msg.MUSIC_NOTE_FS4, "6"],
      [Blockly.Msg.MUSIC_NOTE_F4, "5"],
      [Blockly.Msg.MUSIC_NOTE_EB4, "3"],
      [Blockly.Msg.MUSIC_NOTE_CS4, "1"],
      [Blockly.Msg.MUSIC_NOTE_C4, "0"]
    ],
    [
      // C# Minor
      [Blockly.Msg.MUSIC_NOTE_B6, "35"],
      [Blockly.Msg.MUSIC_NOTE_A6, "33"],
      [Blockly.Msg.MUSIC_NOTE_GS6, "32"],
      [Blockly.Msg.MUSIC_NOTE_FS6, "30"],
      [Blockly.Msg.MUSIC_NOTE_E6, "28"],
      [Blockly.Msg.MUSIC_NOTE_EB6, "27"],
      [Blockly.Msg.MUSIC_NOTE_CS6, "25"],
      [Blockly.Msg.MUSIC_NOTE_B5, "23"],
      [Blockly.Msg.MUSIC_NOTE_A5, "21"],
      [Blockly.Msg.MUSIC_NOTE_GS5, "20"],
      [Blockly.Msg.MUSIC_NOTE_FS5, "18"],
      [Blockly.Msg.MUSIC_NOTE_E5, "16"],
      [Blockly.Msg.MUSIC_NOTE_EB5, "15"],
      [Blockly.Msg.MUSIC_NOTE_CS5, "13"],
      [Blockly.Msg.MUSIC_NOTE_B4, "11"],
      [Blockly.Msg.MUSIC_NOTE_A4, "9"],
      [Blockly.Msg.MUSIC_NOTE_GS4, "8"],
      [Blockly.Msg.MUSIC_NOTE_FS4, "6"],
      [Blockly.Msg.MUSIC_NOTE_E4, "4"],
      [Blockly.Msg.MUSIC_NOTE_EB4, "3"],
      [Blockly.Msg.MUSIC_NOTE_CS4, "1"]
    ],
    [
      // D Major
      [Blockly.Msg.MUSIC_NOTE_B6, "35"],
      [Blockly.Msg.MUSIC_NOTE_A6, "33"],
      [Blockly.Msg.MUSIC_NOTE_G6, "31"],
      [Blockly.Msg.MUSIC_NOTE_FS6, "30"],
      [Blockly.Msg.MUSIC_NOTE_E6, "28"],
      [Blockly.Msg.MUSIC_NOTE_D6, "26"],
      [Blockly.Msg.MUSIC_NOTE_CS6, "25"],
      [Blockly.Msg.MUSIC_NOTE_B5, "23"],
      [Blockly.Msg.MUSIC_NOTE_A5, "21"],
      [Blockly.Msg.MUSIC_NOTE_G5, "19"],
      [Blockly.Msg.MUSIC_NOTE_FS5, "18"],
      [Blockly.Msg.MUSIC_NOTE_E5, "16"],
      [Blockly.Msg.MUSIC_NOTE_D5, "14"],
      [Blockly.Msg.MUSIC_NOTE_CS5, "13"],
      [Blockly.Msg.MUSIC_NOTE_B4, "11"],
      [Blockly.Msg.MUSIC_NOTE_A4, "9"],
      [Blockly.Msg.MUSIC_NOTE_G4, "7"],
      [Blockly.Msg.MUSIC_NOTE_FS4, "6"],
      [Blockly.Msg.MUSIC_NOTE_E4, "4"],
      [Blockly.Msg.MUSIC_NOTE_D4, "2"],
      [Blockly.Msg.MUSIC_NOTE_CS4, "1"]
    ],
    [
      // D Minor
      [Blockly.Msg.MUSIC_NOTE_C7, "36"],
      [Blockly.Msg.MUSIC_NOTE_BB6, "34"],
      [Blockly.Msg.MUSIC_NOTE_A6, "33"],
      [Blockly.Msg.MUSIC_NOTE_G6, "31"],
      [Blockly.Msg.MUSIC_NOTE_F6, "29"],
      [Blockly.Msg.MUSIC_NOTE_EB6, "28"],
      [Blockly.Msg.MUSIC_NOTE_D6, "26"],
      [Blockly.Msg.MUSIC_NOTE_C6, "24"],
      [Blockly.Msg.MUSIC_NOTE_BB5, "22"],
      [Blockly.Msg.MUSIC_NOTE_A5, "21"],
      [Blockly.Msg.MUSIC_NOTE_G5, "19"],
      [Blockly.Msg.MUSIC_NOTE_F5, "17"],
      [Blockly.Msg.MUSIC_NOTE_E5, "16"],
      [Blockly.Msg.MUSIC_NOTE_D5, "14"],
      [Blockly.Msg.MUSIC_NOTE_C5, "12"],
      [Blockly.Msg.MUSIC_NOTE_BB4, "10"],
      [Blockly.Msg.MUSIC_NOTE_A4, "9"],
      [Blockly.Msg.MUSIC_NOTE_G4, "7"],
      [Blockly.Msg.MUSIC_NOTE_F4, "5"],
      [Blockly.Msg.MUSIC_NOTE_E4, "4"],
      [Blockly.Msg.MUSIC_NOTE_D4, "2"],
      [Blockly.Msg.MUSIC_NOTE_C4, "0"]
    ],
    [
      // Eb Major
      [Blockly.Msg.MUSIC_NOTE_C7, "36"],
      [Blockly.Msg.MUSIC_NOTE_BB6, "34"],
      [Blockly.Msg.MUSIC_NOTE_GS6, "32"],
      [Blockly.Msg.MUSIC_NOTE_G6, "31"],
      [Blockly.Msg.MUSIC_NOTE_F6, "29"],
      [Blockly.Msg.MUSIC_NOTE_EB6, "27"],
      [Blockly.Msg.MUSIC_NOTE_D6, "26"],
      [Blockly.Msg.MUSIC_NOTE_C6, "24"],
      [Blockly.Msg.MUSIC_NOTE_BB5, "22"],
      [Blockly.Msg.MUSIC_NOTE_GS5, "20"],
      [Blockly.Msg.MUSIC_NOTE_G5, "19"],
      [Blockly.Msg.MUSIC_NOTE_F5, "17"],
      [Blockly.Msg.MUSIC_NOTE_EB5, "15"],
      [Blockly.Msg.MUSIC_NOTE_D5, "14"],
      [Blockly.Msg.MUSIC_NOTE_C5, "12"],
      [Blockly.Msg.MUSIC_NOTE_BB4, "10"],
      [Blockly.Msg.MUSIC_NOTE_GS4, "8"],
      [Blockly.Msg.MUSIC_NOTE_G4, "7"],
      [Blockly.Msg.MUSIC_NOTE_F4, "5"],
      [Blockly.Msg.MUSIC_NOTE_EB4, "3"],
      [Blockly.Msg.MUSIC_NOTE_D4, "2"],
      [Blockly.Msg.MUSIC_NOTE_C4, "0"]
    ],
    [
      // Eb Minor
      [Blockly.Msg.MUSIC_NOTE_B6, "35"],
      [Blockly.Msg.MUSIC_NOTE_BB6, "34"],
      [Blockly.Msg.MUSIC_NOTE_GS6, "32"],
      [Blockly.Msg.MUSIC_NOTE_FS6, "30"],
      [Blockly.Msg.MUSIC_NOTE_F6, "29"],
      [Blockly.Msg.MUSIC_NOTE_EB6, "27"],
      [Blockly.Msg.MUSIC_NOTE_CS6, "25"],
      [Blockly.Msg.MUSIC_NOTE_B5, "23"],
      [Blockly.Msg.MUSIC_NOTE_BB5, "22"],
      [Blockly.Msg.MUSIC_NOTE_GS5, "20"],
      [Blockly.Msg.MUSIC_NOTE_FS5, "18"],
      [Blockly.Msg.MUSIC_NOTE_F5, "17"],
      [Blockly.Msg.MUSIC_NOTE_EB5, "15"],
      [Blockly.Msg.MUSIC_NOTE_CS5, "13"],
      [Blockly.Msg.MUSIC_NOTE_B4, "11"],
      [Blockly.Msg.MUSIC_NOTE_BB4, "10"],
      [Blockly.Msg.MUSIC_NOTE_GS4, "8"],
      [Blockly.Msg.MUSIC_NOTE_FS4, "6"],
      [Blockly.Msg.MUSIC_NOTE_F4, "5"],
      [Blockly.Msg.MUSIC_NOTE_EB4, "3"],
      [Blockly.Msg.MUSIC_NOTE_CS4, "1"]
    ],
    [
      // E Major
      [Blockly.Msg.MUSIC_NOTE_B6, "35"],
      [Blockly.Msg.MUSIC_NOTE_A6, "33"],
      [Blockly.Msg.MUSIC_NOTE_GS6, "32"],
      [Blockly.Msg.MUSIC_NOTE_FS6, "30"],
      [Blockly.Msg.MUSIC_NOTE_E6, "28"],
      [Blockly.Msg.MUSIC_NOTE_EB6, "27"],
      [Blockly.Msg.MUSIC_NOTE_CS6, "25"],
      [Blockly.Msg.MUSIC_NOTE_B5, "23"],
      [Blockly.Msg.MUSIC_NOTE_A5, "21"],
      [Blockly.Msg.MUSIC_NOTE_GS5, "20"],
      [Blockly.Msg.MUSIC_NOTE_FS5, "18"],
      [Blockly.Msg.MUSIC_NOTE_E5, "16"],
      [Blockly.Msg.MUSIC_NOTE_EB5, "15"],
      [Blockly.Msg.MUSIC_NOTE_CS5, "13"],
      [Blockly.Msg.MUSIC_NOTE_B4, "11"],
      [Blockly.Msg.MUSIC_NOTE_A4, "9"],
      [Blockly.Msg.MUSIC_NOTE_GS4, "8"],
      [Blockly.Msg.MUSIC_NOTE_FS4, "6"],
      [Blockly.Msg.MUSIC_NOTE_E4, "4"],
      [Blockly.Msg.MUSIC_NOTE_EB4, "3"],
      [Blockly.Msg.MUSIC_NOTE_CS4, "1"]
    ],
    [
      // E Minor
      [Blockly.Msg.MUSIC_NOTE_C7, "36"],
      [Blockly.Msg.MUSIC_NOTE_B6, "35"],
      [Blockly.Msg.MUSIC_NOTE_A6, "33"],
      [Blockly.Msg.MUSIC_NOTE_G6, "31"],
      [Blockly.Msg.MUSIC_NOTE_FS6, "30"],
      [Blockly.Msg.MUSIC_NOTE_E6, "28"],
      [Blockly.Msg.MUSIC_NOTE_D6, "26"],
      [Blockly.Msg.MUSIC_NOTE_C6, "24"],
      [Blockly.Msg.MUSIC_NOTE_B5, "23"],
      [Blockly.Msg.MUSIC_NOTE_A5, "21"],
      [Blockly.Msg.MUSIC_NOTE_G5, "19"],
      [Blockly.Msg.MUSIC_NOTE_FS5, "18"],
      [Blockly.Msg.MUSIC_NOTE_E5, "16"],
      [Blockly.Msg.MUSIC_NOTE_D5, "14"],
      [Blockly.Msg.MUSIC_NOTE_C5, "12"],
      [Blockly.Msg.MUSIC_NOTE_B4, "11"],
      [Blockly.Msg.MUSIC_NOTE_A4, "9"],
      [Blockly.Msg.MUSIC_NOTE_G4, "7"],
      [Blockly.Msg.MUSIC_NOTE_FS4, "6"],
      [Blockly.Msg.MUSIC_NOTE_E4, "4"],
      [Blockly.Msg.MUSIC_NOTE_D4, "2"],
      [Blockly.Msg.MUSIC_NOTE_C4, "0"]
    ],
    [
      // F Major
      [Blockly.Msg.MUSIC_NOTE_C7, "36"],
      [Blockly.Msg.MUSIC_NOTE_BB6, "34"],
      [Blockly.Msg.MUSIC_NOTE_A6, "33"],
      [Blockly.Msg.MUSIC_NOTE_G6, "31"],
      [Blockly.Msg.MUSIC_NOTE_F6, "29"],
      [Blockly.Msg.MUSIC_NOTE_E6, "28"],
      [Blockly.Msg.MUSIC_NOTE_D6, "26"],
      [Blockly.Msg.MUSIC_NOTE_C6, "24"],
      [Blockly.Msg.MUSIC_NOTE_BB5, "22"],
      [Blockly.Msg.MUSIC_NOTE_A5, "21"],
      [Blockly.Msg.MUSIC_NOTE_G5, "19"],
      [Blockly.Msg.MUSIC_NOTE_F5, "17"],
      [Blockly.Msg.MUSIC_NOTE_E5, "16"],
      [Blockly.Msg.MUSIC_NOTE_D5, "14"],
      [Blockly.Msg.MUSIC_NOTE_C5, "12"],
      [Blockly.Msg.MUSIC_NOTE_BB4, "10"],
      [Blockly.Msg.MUSIC_NOTE_A4, "9"],
      [Blockly.Msg.MUSIC_NOTE_G4, "7"],
      [Blockly.Msg.MUSIC_NOTE_F4, "5"],
      [Blockly.Msg.MUSIC_NOTE_E4, "4"],
      [Blockly.Msg.MUSIC_NOTE_D4, "2"],
      [Blockly.Msg.MUSIC_NOTE_C4, "0"]
    ],
    [
      // F Minor
      [Blockly.Msg.MUSIC_NOTE_C7, "36"],
      [Blockly.Msg.MUSIC_NOTE_BB6, "34"],
      [Blockly.Msg.MUSIC_NOTE_GS6, "32"],
      [Blockly.Msg.MUSIC_NOTE_G6, "31"],
      [Blockly.Msg.MUSIC_NOTE_F6, "29"],
      [Blockly.Msg.MUSIC_NOTE_EB6, "27"],
      [Blockly.Msg.MUSIC_NOTE_CS6, "25"],
      [Blockly.Msg.MUSIC_NOTE_C6, "24"],
      [Blockly.Msg.MUSIC_NOTE_BB5, "22"],
      [Blockly.Msg.MUSIC_NOTE_GS5, "20"],
      [Blockly.Msg.MUSIC_NOTE_G5, "19"],
      [Blockly.Msg.MUSIC_NOTE_F5, "17"],
      [Blockly.Msg.MUSIC_NOTE_EB5, "15"],
      [Blockly.Msg.MUSIC_NOTE_CS5, "13"],
      [Blockly.Msg.MUSIC_NOTE_C5, "12"],
      [Blockly.Msg.MUSIC_NOTE_BB4, "10"],
      [Blockly.Msg.MUSIC_NOTE_GS4, "8"],
      [Blockly.Msg.MUSIC_NOTE_G4, "7"],
      [Blockly.Msg.MUSIC_NOTE_F4, "5"],
      [Blockly.Msg.MUSIC_NOTE_EB4, "3"],
      [Blockly.Msg.MUSIC_NOTE_CS4, "1"],
      [Blockly.Msg.MUSIC_NOTE_C4, "0"]
    ],
    [
      // F# Major
      [Blockly.Msg.MUSIC_NOTE_B6, "35"],
      [Blockly.Msg.MUSIC_NOTE_BB6, "34"],
      [Blockly.Msg.MUSIC_NOTE_GS6, "32"],
      [Blockly.Msg.MUSIC_NOTE_FS6, "30"],
      [Blockly.Msg.MUSIC_NOTE_F6, "29"],
      [Blockly.Msg.MUSIC_NOTE_EB6, "27"],
      [Blockly.Msg.MUSIC_NOTE_CS6, "25"],
      [Blockly.Msg.MUSIC_NOTE_B5, "23"],
      [Blockly.Msg.MUSIC_NOTE_BB5, "22"],
      [Blockly.Msg.MUSIC_NOTE_GS5, "20"],
      [Blockly.Msg.MUSIC_NOTE_FS5, "18"],
      [Blockly.Msg.MUSIC_NOTE_F5, "17"],
      [Blockly.Msg.MUSIC_NOTE_EB5, "15"],
      [Blockly.Msg.MUSIC_NOTE_CS5, "13"],
      [Blockly.Msg.MUSIC_NOTE_B4, "11"],
      [Blockly.Msg.MUSIC_NOTE_BB4, "10"],
      [Blockly.Msg.MUSIC_NOTE_GS4, "8"],
      [Blockly.Msg.MUSIC_NOTE_FS4, "6"],
      [Blockly.Msg.MUSIC_NOTE_F4, "5"],
      [Blockly.Msg.MUSIC_NOTE_EB4, "3"],
      [Blockly.Msg.MUSIC_NOTE_CS4, "1"]
    ],
    [
      // F# Minor
      [Blockly.Msg.MUSIC_NOTE_B6, "35"],
      [Blockly.Msg.MUSIC_NOTE_A6, "33"],
      [Blockly.Msg.MUSIC_NOTE_GS6, "32"],
      [Blockly.Msg.MUSIC_NOTE_FS6, "30"],
      [Blockly.Msg.MUSIC_NOTE_E6, "28"],
      [Blockly.Msg.MUSIC_NOTE_D6, "26"],
      [Blockly.Msg.MUSIC_NOTE_CS6, "25"],
      [Blockly.Msg.MUSIC_NOTE_B5, "23"],
      [Blockly.Msg.MUSIC_NOTE_A5, "21"],
      [Blockly.Msg.MUSIC_NOTE_GS5, "20"],
      [Blockly.Msg.MUSIC_NOTE_FS5, "18"],
      [Blockly.Msg.MUSIC_NOTE_E5, "16"],
      [Blockly.Msg.MUSIC_NOTE_D5, "14"],
      [Blockly.Msg.MUSIC_NOTE_CS5, "13"],
      [Blockly.Msg.MUSIC_NOTE_B4, "11"],
      [Blockly.Msg.MUSIC_NOTE_A4, "9"],
      [Blockly.Msg.MUSIC_NOTE_GS4, "8"],
      [Blockly.Msg.MUSIC_NOTE_FS4, "6"],
      [Blockly.Msg.MUSIC_NOTE_E4, "4"],
      [Blockly.Msg.MUSIC_NOTE_D4, "2"],
      [Blockly.Msg.MUSIC_NOTE_CS4, "1"]
    ],
    [
      // G Major
      [Blockly.Msg.MUSIC_NOTE_C7, "36"],
      [Blockly.Msg.MUSIC_NOTE_B6, "35"],
      [Blockly.Msg.MUSIC_NOTE_A6, "33"],
      [Blockly.Msg.MUSIC_NOTE_G6, "31"],
      [Blockly.Msg.MUSIC_NOTE_FS6, "30"],
      [Blockly.Msg.MUSIC_NOTE_E6, "28"],
      [Blockly.Msg.MUSIC_NOTE_D6, "26"],
      [Blockly.Msg.MUSIC_NOTE_C6, "24"],
      [Blockly.Msg.MUSIC_NOTE_B5, "23"],
      [Blockly.Msg.MUSIC_NOTE_A5, "21"],
      [Blockly.Msg.MUSIC_NOTE_G5, "19"],
      [Blockly.Msg.MUSIC_NOTE_FS5, "18"],
      [Blockly.Msg.MUSIC_NOTE_E5, "16"],
      [Blockly.Msg.MUSIC_NOTE_D5, "14"],
      [Blockly.Msg.MUSIC_NOTE_C5, "12"],
      [Blockly.Msg.MUSIC_NOTE_B4, "11"],
      [Blockly.Msg.MUSIC_NOTE_A4, "9"],
      [Blockly.Msg.MUSIC_NOTE_G4, "7"],
      [Blockly.Msg.MUSIC_NOTE_FS4, "6"],
      [Blockly.Msg.MUSIC_NOTE_E4, "4"],
      [Blockly.Msg.MUSIC_NOTE_D4, "2"],
      [Blockly.Msg.MUSIC_NOTE_C4, "0"]
    ],
    [
      // G Minor
      [Blockly.Msg.MUSIC_NOTE_C7, "36"],
      [Blockly.Msg.MUSIC_NOTE_BB6, "34"],
      [Blockly.Msg.MUSIC_NOTE_A6, "33"],
      [Blockly.Msg.MUSIC_NOTE_G6, "31"],
      [Blockly.Msg.MUSIC_NOTE_F6, "29"],
      [Blockly.Msg.MUSIC_NOTE_EB6, "27"],
      [Blockly.Msg.MUSIC_NOTE_D6, "26"],
      [Blockly.Msg.MUSIC_NOTE_C6, "24"],
      [Blockly.Msg.MUSIC_NOTE_BB5, "22"],
      [Blockly.Msg.MUSIC_NOTE_A5, "21"],
      [Blockly.Msg.MUSIC_NOTE_G5, "19"],
      [Blockly.Msg.MUSIC_NOTE_F5, "17"],
      [Blockly.Msg.MUSIC_NOTE_EB5, "15"],
      [Blockly.Msg.MUSIC_NOTE_D5, "14"],
      [Blockly.Msg.MUSIC_NOTE_C5, "12"],
      [Blockly.Msg.MUSIC_NOTE_BB4, "10"],
      [Blockly.Msg.MUSIC_NOTE_A4, "9"],
      [Blockly.Msg.MUSIC_NOTE_G4, "7"],
      [Blockly.Msg.MUSIC_NOTE_F4, "5"],
      [Blockly.Msg.MUSIC_NOTE_EB4, "3"],
      [Blockly.Msg.MUSIC_NOTE_D4, "2"],
      [Blockly.Msg.MUSIC_NOTE_C4, "0"]
    ],
    [
      // G# Major
      [Blockly.Msg.MUSIC_NOTE_C7, "36"],
      [Blockly.Msg.MUSIC_NOTE_BB6, "34"],
      [Blockly.Msg.MUSIC_NOTE_GS6, "32"],
      [Blockly.Msg.MUSIC_NOTE_G6, "31"],
      [Blockly.Msg.MUSIC_NOTE_F6, "29"],
      [Blockly.Msg.MUSIC_NOTE_EB6, "27"],
      [Blockly.Msg.MUSIC_NOTE_CS6, "25"],
      [Blockly.Msg.MUSIC_NOTE_C6, "24"],
      [Blockly.Msg.MUSIC_NOTE_BB5, "22"],
      [Blockly.Msg.MUSIC_NOTE_GS5, "20"],
      [Blockly.Msg.MUSIC_NOTE_G5, "19"],
      [Blockly.Msg.MUSIC_NOTE_F5, "17"],
      [Blockly.Msg.MUSIC_NOTE_EB5, "15"],
      [Blockly.Msg.MUSIC_NOTE_CS5, "13"],
      [Blockly.Msg.MUSIC_NOTE_C5, "12"],
      [Blockly.Msg.MUSIC_NOTE_BB4, "10"],
      [Blockly.Msg.MUSIC_NOTE_GS4, "8"],
      [Blockly.Msg.MUSIC_NOTE_G4, "7"],
      [Blockly.Msg.MUSIC_NOTE_F4, "5"],
      [Blockly.Msg.MUSIC_NOTE_EB4, "3"],
      [Blockly.Msg.MUSIC_NOTE_CS4, "1"],
      [Blockly.Msg.MUSIC_NOTE_C4, "0"]
    ],
    [
      // G# Minor
      [Blockly.Msg.MUSIC_NOTE_B6, "35"],
      [Blockly.Msg.MUSIC_NOTE_BB6, "34"],
      [Blockly.Msg.MUSIC_NOTE_GS6, "32"],
      [Blockly.Msg.MUSIC_NOTE_FS6, "30"],
      [Blockly.Msg.MUSIC_NOTE_E6, "28"],
      [Blockly.Msg.MUSIC_NOTE_EB6, "27"],
      [Blockly.Msg.MUSIC_NOTE_CS6, "25"],
      [Blockly.Msg.MUSIC_NOTE_B5, "23"],
      [Blockly.Msg.MUSIC_NOTE_BB5, "22"],
      [Blockly.Msg.MUSIC_NOTE_GS5, "20"],
      [Blockly.Msg.MUSIC_NOTE_FS5, "18"],
      [Blockly.Msg.MUSIC_NOTE_E5, "16"],
      [Blockly.Msg.MUSIC_NOTE_EB5, "15"],
      [Blockly.Msg.MUSIC_NOTE_CS5, "13"],
      [Blockly.Msg.MUSIC_NOTE_B4, "11"],
      [Blockly.Msg.MUSIC_NOTE_BB4, "10"],
      [Blockly.Msg.MUSIC_NOTE_GS4, "8"],
      [Blockly.Msg.MUSIC_NOTE_FS4, "6"],
      [Blockly.Msg.MUSIC_NOTE_E4, "4"],
      [Blockly.Msg.MUSIC_NOTE_EB4, "3"],
      [Blockly.Msg.MUSIC_NOTE_CS4, "1"]
    ],
    [
      // A Major
      [Blockly.Msg.MUSIC_NOTE_B6, "35"],
      [Blockly.Msg.MUSIC_NOTE_A6, "33"],
      [Blockly.Msg.MUSIC_NOTE_GS6, "32"],
      [Blockly.Msg.MUSIC_NOTE_FS6, "30"],
      [Blockly.Msg.MUSIC_NOTE_E6, "28"],
      [Blockly.Msg.MUSIC_NOTE_D6, "26"],
      [Blockly.Msg.MUSIC_NOTE_CS6, "25"],
      [Blockly.Msg.MUSIC_NOTE_B5, "23"],
      [Blockly.Msg.MUSIC_NOTE_A5, "21"],
      [Blockly.Msg.MUSIC_NOTE_GS5, "20"],
      [Blockly.Msg.MUSIC_NOTE_FS5, "18"],
      [Blockly.Msg.MUSIC_NOTE_E5, "16"],
      [Blockly.Msg.MUSIC_NOTE_D5, "14"],
      [Blockly.Msg.MUSIC_NOTE_CS5, "13"],
      [Blockly.Msg.MUSIC_NOTE_B4, "11"],
      [Blockly.Msg.MUSIC_NOTE_A4, "9"],
      [Blockly.Msg.MUSIC_NOTE_GS4, "8"],
      [Blockly.Msg.MUSIC_NOTE_FS4, "6"],
      [Blockly.Msg.MUSIC_NOTE_E4, "4"],
      [Blockly.Msg.MUSIC_NOTE_D4, "2"],
      [Blockly.Msg.MUSIC_NOTE_CS4, "1"]
    ],
    [
      // A Minor
      [Blockly.Msg.MUSIC_NOTE_C7, "36"],
      [Blockly.Msg.MUSIC_NOTE_B6, "35"],
      [Blockly.Msg.MUSIC_NOTE_A6, "33"],
      [Blockly.Msg.MUSIC_NOTE_G6, "31"],
      [Blockly.Msg.MUSIC_NOTE_F6, "29"],
      [Blockly.Msg.MUSIC_NOTE_E6, "28"],
      [Blockly.Msg.MUSIC_NOTE_D6, "26"],
      [Blockly.Msg.MUSIC_NOTE_C6, "24"],
      [Blockly.Msg.MUSIC_NOTE_B5, "23"],
      [Blockly.Msg.MUSIC_NOTE_A5, "21"],
      [Blockly.Msg.MUSIC_NOTE_G5, "19"],
      [Blockly.Msg.MUSIC_NOTE_F5, "17"],
      [Blockly.Msg.MUSIC_NOTE_E5, "16"],
      [Blockly.Msg.MUSIC_NOTE_D5, "14"],
      [Blockly.Msg.MUSIC_NOTE_C5, "12"],
      [Blockly.Msg.MUSIC_NOTE_B4, "11"],
      [Blockly.Msg.MUSIC_NOTE_A4, "9"],
      [Blockly.Msg.MUSIC_NOTE_G4, "7"],
      [Blockly.Msg.MUSIC_NOTE_F4, "5"],
      [Blockly.Msg.MUSIC_NOTE_E4, "4"],
      [Blockly.Msg.MUSIC_NOTE_D4, "2"],
      [Blockly.Msg.MUSIC_NOTE_C4, "0"]
    ],
    [
      // Bb Major
      [Blockly.Msg.MUSIC_NOTE_C7, "36"],
      [Blockly.Msg.MUSIC_NOTE_BB6, "34"],
      [Blockly.Msg.MUSIC_NOTE_A6, "33"],
      [Blockly.Msg.MUSIC_NOTE_G6, "31"],
      [Blockly.Msg.MUSIC_NOTE_F6, "29"],
      [Blockly.Msg.MUSIC_NOTE_EB6, "27"],
      [Blockly.Msg.MUSIC_NOTE_D6, "26"],
      [Blockly.Msg.MUSIC_NOTE_C6, "24"],
      [Blockly.Msg.MUSIC_NOTE_BB5, "22"],
      [Blockly.Msg.MUSIC_NOTE_A5, "21"],
      [Blockly.Msg.MUSIC_NOTE_G5, "19"],
      [Blockly.Msg.MUSIC_NOTE_F5, "17"],
      [Blockly.Msg.MUSIC_NOTE_EB5, "15"],
      [Blockly.Msg.MUSIC_NOTE_D5, "14"],
      [Blockly.Msg.MUSIC_NOTE_C5, "12"],
      [Blockly.Msg.MUSIC_NOTE_BB4, "10"],
      [Blockly.Msg.MUSIC_NOTE_A4, "9"],
      [Blockly.Msg.MUSIC_NOTE_G4, "7"],
      [Blockly.Msg.MUSIC_NOTE_F4, "5"],
      [Blockly.Msg.MUSIC_NOTE_EB4, "3"],
      [Blockly.Msg.MUSIC_NOTE_D4, "2"],
      [Blockly.Msg.MUSIC_NOTE_C4, "0"]
    ],
    [
      // Bb Minor
      [Blockly.Msg.MUSIC_NOTE_C7, "36"],
      [Blockly.Msg.MUSIC_NOTE_BB6, "34"],
      [Blockly.Msg.MUSIC_NOTE_GS6, "32"],
      [Blockly.Msg.MUSIC_NOTE_FS6, "30"],
      [Blockly.Msg.MUSIC_NOTE_F6, "29"],
      [Blockly.Msg.MUSIC_NOTE_EB6, "27"],
      [Blockly.Msg.MUSIC_NOTE_CS6, "25"],
      [Blockly.Msg.MUSIC_NOTE_C6, "24"],
      [Blockly.Msg.MUSIC_NOTE_BB5, "22"],
      [Blockly.Msg.MUSIC_NOTE_GS5, "20"],
      [Blockly.Msg.MUSIC_NOTE_FS5, "18"],
      [Blockly.Msg.MUSIC_NOTE_F5, "17"],
      [Blockly.Msg.MUSIC_NOTE_EB5, "15"],
      [Blockly.Msg.MUSIC_NOTE_CS5, "13"],
      [Blockly.Msg.MUSIC_NOTE_C5, "12"],
      [Blockly.Msg.MUSIC_NOTE_BB4, "10"],
      [Blockly.Msg.MUSIC_NOTE_GS4, "8"],
      [Blockly.Msg.MUSIC_NOTE_FS4, "6"],
      [Blockly.Msg.MUSIC_NOTE_F4, "5"],
      [Blockly.Msg.MUSIC_NOTE_EB4, "3"],
      [Blockly.Msg.MUSIC_NOTE_CS4, "1"],
      [Blockly.Msg.MUSIC_NOTE_C4, "0"]
    ],
    [
      // B Major
      [Blockly.Msg.MUSIC_NOTE_B6, "35"],
      [Blockly.Msg.MUSIC_NOTE_BB6, "34"],
      [Blockly.Msg.MUSIC_NOTE_GS6, "32"],
      [Blockly.Msg.MUSIC_NOTE_FS6, "30"],
      [Blockly.Msg.MUSIC_NOTE_E6, "28"],
      [Blockly.Msg.MUSIC_NOTE_EB6, "27"],
      [Blockly.Msg.MUSIC_NOTE_CS6, "25"],
      [Blockly.Msg.MUSIC_NOTE_B5, "23"],
      [Blockly.Msg.MUSIC_NOTE_BB5, "22"],
      [Blockly.Msg.MUSIC_NOTE_GS5, "20"],
      [Blockly.Msg.MUSIC_NOTE_FS5, "18"],
      [Blockly.Msg.MUSIC_NOTE_E5, "16"],
      [Blockly.Msg.MUSIC_NOTE_EB5, "15"],
      [Blockly.Msg.MUSIC_NOTE_CS5, "13"],
      [Blockly.Msg.MUSIC_NOTE_B4, "11"],
      [Blockly.Msg.MUSIC_NOTE_BB4, "10"],
      [Blockly.Msg.MUSIC_NOTE_GS4, "8"],
      [Blockly.Msg.MUSIC_NOTE_FS4, "6"],
      [Blockly.Msg.MUSIC_NOTE_E4, "4"],
      [Blockly.Msg.MUSIC_NOTE_EB4, "3"],
      [Blockly.Msg.MUSIC_NOTE_CS4, "1"]
    ],
    [
      // B Minor
      [Blockly.Msg.MUSIC_NOTE_B6, "35"],
      [Blockly.Msg.MUSIC_NOTE_A6, "33"],
      [Blockly.Msg.MUSIC_NOTE_G6, "31"],
      [Blockly.Msg.MUSIC_NOTE_FS6, "30"],
      [Blockly.Msg.MUSIC_NOTE_E6, "28"],
      [Blockly.Msg.MUSIC_NOTE_D6, "26"],
      [Blockly.Msg.MUSIC_NOTE_CS6, "25"],
      [Blockly.Msg.MUSIC_NOTE_B5, "23"],
      [Blockly.Msg.MUSIC_NOTE_A5, "21"],
      [Blockly.Msg.MUSIC_NOTE_G5, "19"],
      [Blockly.Msg.MUSIC_NOTE_FS5, "18"],
      [Blockly.Msg.MUSIC_NOTE_E5, "16"],
      [Blockly.Msg.MUSIC_NOTE_D5, "14"],
      [Blockly.Msg.MUSIC_NOTE_CS5, "13"],
      [Blockly.Msg.MUSIC_NOTE_B4, "11"],
      [Blockly.Msg.MUSIC_NOTE_A4, "9"],
      [Blockly.Msg.MUSIC_NOTE_G4, "7"],
      [Blockly.Msg.MUSIC_NOTE_FS4, "6"],
      [Blockly.Msg.MUSIC_NOTE_E4, "4"],
      [Blockly.Msg.MUSIC_NOTE_D4, "2"],
      [Blockly.Msg.MUSIC_NOTE_CS4, "1"]
    ]
  ];

  Blockly.Blocks["music_scale"] = {
    init: function() {
      this.appendDummyInput()
        .appendField(
          new Blockly.FieldImage("/static/block_icons/buzzer.png",
            20,
            20,
            "*")
        )
        .appendField(Blockly.Msg.MUSIC_SCALE_TITLE)
        .appendField(
          new Blockly.FieldDropdown(
            [
              [Blockly.Msg.MUSIC_SCALE_CMAJ, "0"],
              [Blockly.Msg.MUSIC_SCALE_CMIN, "1"],
              [Blockly.Msg.MUSIC_SCALE_CSMAJ, "2"],
              [Blockly.Msg.MUSIC_SCALE_CSMIN, "3"],
              [Blockly.Msg.MUSIC_SCALE_DMAJ, "4"],
              [Blockly.Msg.MUSIC_SCALE_DMIN, "5"],
              [Blockly.Msg.MUSIC_SCALE_EBMAJ, "6"],
              [Blockly.Msg.MUSIC_SCALE_EBMIN, "7"],
              [Blockly.Msg.MUSIC_SCALE_EMAJ, "8"],
              [Blockly.Msg.MUSIC_SCALE_EMIN, "9"],
              [Blockly.Msg.MUSIC_SCALE_FMAJ, "10"],
              [Blockly.Msg.MUSIC_SCALE_FMIN, "11"],
              [Blockly.Msg.MUSIC_SCALE_FSMAJ, "12"],
              [Blockly.Msg.MUSIC_SCALE_FSMIN, "13"],
              [Blockly.Msg.MUSIC_SCALE_GMAJ, "14"],
              [Blockly.Msg.MUSIC_SCALE_GMIN, "15"],
              [Blockly.Msg.MUSIC_SCALE_GSMAJ, "16"],
              [Blockly.Msg.MUSIC_SCALE_GSMIN, "17"],
              [Blockly.Msg.MUSIC_SCALE_AMAJ, "18"],
              [Blockly.Msg.MUSIC_SCALE_AMIN, "19"],
              [Blockly.Msg.MUSIC_SCALE_BBMAJ, "20"],
              [Blockly.Msg.MUSIC_SCALE_BBMIN, "21"],
              [Blockly.Msg.MUSIC_SCALE_BMAJ, "22"],
              [Blockly.Msg.MUSIC_SCALE_BMIN, "23"]
            ],
            function(selectedIndex) {
              this.sourceBlock_.inputList[1].fieldRow[1].menuGenerator_ =
                Blockly.Blocks["music_scale_opt"][selectedIndex];
              this.sourceBlock_.inputList[1].fieldRow[1].setValue(
                Blockly.Blocks["music_scale_opt"][selectedIndex][0][1]
              );
              return selectedIndex;
            }
          ),
          "SCALE"
        );

      //https://developers.google.com/blockly/guides/create-custom-blocks/dropdown-menus#dynamic_menu
      this.appendDummyInput()
        .appendField(Blockly.Msg.MUSIC_NOTE_TITLE)
        .appendField(
          new Blockly.FieldDropdown(function() {
            try {
              if (
                typeof this.sourceBlock_ != "undefined" &&
                typeof this.sourceBlock_.inputList != "undefined"
              ) {
                var scale_dropdown = this.sourceBlock_.inputList[0].fieldRow[2];
                return Blockly.Blocks["music_scale_opt"][scale_dropdown.value_];
              }
            } catch (e) {}
            // default
            return Blockly.Blocks["music_scale_opt"][0];
          }),
          "NOTE"
        );

      this.appendDummyInput()
        .appendField(Blockly.Msg.MUSIC_NOTE_DURATION)
        .appendField(
          new Blockly.FieldDropdown(Blockly.Blocks["music_duration_opt"]),
          "DURATION"
        );
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(music_colour);
      this.setTooltip(Blockly.Msg.MUSIC_SCALE_TOOLTIP);
      this.setHelpUrl(Blockly.Msg.MUSIC_SCALE_HELPURL);
    }
  };

  Blockly.Blocks["music_set_volume"] = {
    init: function() {
      // music volume 0 - 100 %
      this.appendDummyInput()
        .appendField(
          new Blockly.FieldImage("/static/block_icons/buzzer.png",
            30,
            30,
            "*")
        )
        .appendField(Blockly.Msg.MUSIC_SET_VOLUME_TITLE)
        .appendField(new Blockly.FieldNumber(50, 0, 100, 1), "VALUE")
        .appendField("%");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(music_colour);
      this.setTooltip(Blockly.Msg.MUSIC_SET_VOLUME_TOOLTIP);
      this.setHelpUrl(Blockly.Msg.MUSIC_SET_VOLUME_HELPURL);
    }
  };

  Blockly.Blocks["music_get_volume"] = {
    init: function() {
      this.appendDummyInput()
        .appendField(
          new Blockly.FieldImage("/static/block_icons/buzzer.png",
            30,
            30,
            "*")
        )
        .appendField(Blockly.Msg.MUSIC_GET_VOLUME_TITLE);
      this.setOutput(true, "Number");
      this.setPreviousStatement(false);
      this.setNextStatement(false);
      this.setColour(music_colour);
      this.setTooltip(Blockly.Msg.MUSIC_GET_VOLUME_TOOLTIP);
      this.setHelpUrl(Blockly.Msg.MUSIC_GET_VOLUME_HELPURL);
    }
  };

  // =============================================================================
};
