#include <Arduino.h>
#include <WiFi.h>
#include <WiFiClient.h>
#include <WiFiAP.h>
#include <WebServer.h>
#include "SSD1306Wire.h"
#include "SH1106.h"
SH1106 display(0x3c, 21, 22);
${EXTINC}

${VARIABLE}

${FUNCTION}

void setup()
{
  Wire.begin(21, 22);
    display.init();

    display.flipScreenVertically();
    display.setFont(ArialMT_Plain_10);${SETUP_CODE}
  ${BLOCKSETUP}
}
void loop()
{
  ${LOOP_CODE}
  ${LOOP_EXT_CODE}
}
