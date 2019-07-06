#include <Arduino.h>
#include <WiFi.h>
#include <WiFiClient.h>
#include <WiFiAP.h>
#include <WebServer.h>

Number sw1;
Number LED;

void setup()
{
  sw1 = 0;
  LED = 0;
  pinMode(sw1, INPUT_PULLUP);
  pinMode(LED, OUTPUT);
}
void loop()
{
  if (digitalRead(sw1) == 0) {
    digitalWrite(LED, 0);
  } else {
    digitalWrite(LED, 0);
  }
}
