#include <Arduino.h>
#include <WiFi.h>
#include <WiFiClient.h>
#include <WiFiAP.h>
#include <WebServer.h>

void setup()
{
  /* setup code */
  /* block setup */
  Serial.begin(115200);
}

void loop()
{
  Serial.println(((String("KNOB value :") + String(analogRead(36)))));
  delay(200);
}
