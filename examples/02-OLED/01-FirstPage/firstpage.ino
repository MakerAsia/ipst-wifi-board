#include <Arduino.h>
#include <WiFi.h>
#include <WiFiClient.h>
#include <WiFiAP.h>
#include <WebServer.h>
#include "SSD1306Wire.h"
#include "SH1106.h"

SH1106 display(0x3c, 21, 22);

void setup()
{
  display.init();
  display.flipScreenVertically();
  display.setFont(ArialMT_Plain_10);
  /* setup code */

  /* block setup */
  display.setFont(ArialMT_Plain_24);
  display.drawString(0, 0, String(String("Hello World!")));

  display.setFont(ArialMT_Plain_16);
  display.drawString(0, 24, String(String("Hello World!")));

  display.setFont(ArialMT_Plain_10);
  display.drawString(0, 40, String(String("Hello World!")));
  display.display();
  delay(1000);
  
  display.clear();
  display.setFont(ArialMT_Plain_24);
  display.drawString(0, 0, String(String("Hello World!")));

  display.setFont(ArialMT_Plain_10);
  display.drawString(0, 24, String(((String("Hello World len=") + String("Hello World!").length()))));

  display.setFont(ArialMT_Plain_10);
  display.drawString(0, 34, String(((String("Screen width=") + String(display.getWidth())))));

  display.setFont(ArialMT_Plain_10);
  display.drawString(0, 44, String(((String("Screen height=") + String(display.getHeight())))));
  display.display();
}

void loop()
{


}
