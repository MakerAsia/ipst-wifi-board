#include <Arduino.h>
#include <WiFi.h>
#include <WiFiClient.h>
#include <WiFiAP.h>
#include <WebServer.h>
#include "SSD1306Wire.h"
#include "SH1106.h"

SH1106 display(0x3c, 21, 22);

Number y;
Number i;

void setup()
{
  display.init();
  display.flipScreenVertically();
  display.setFont(ArialMT_Plain_10);
  /* setup code */

  /* block setup */
  display.setFont(ArialMT_Plain_10);
  display.drawString(0, 0, String(String("Draw line")));
  y = 12;
  for (i = 0; i <= 10; i++) {
    y = y + 10;
    display.drawLine(0, 12, 128, y);
    display.display();
    delay(100);
  }
  
  display.clear();
  display.setFont(ArialMT_Plain_10);
  display.drawString(0, 0, String(String("Draw rectangle")));
  display.drawRect(32, 16, 40, 30);
  display.display();
  delay(500);
  display.fillRect(32, 16, 40, 30);
  display.display();
  delay(1000);
  
  display.clear();
  display.setFont(ArialMT_Plain_10);
  display.drawString(0, 0, String(String("Draw circle")));
  display.drawCircle(64, 32, 20);
  display.display();
  delay(500);
  display.fillCircle(64, 32, 20);
  display.display();
}

void loop()
{


}
