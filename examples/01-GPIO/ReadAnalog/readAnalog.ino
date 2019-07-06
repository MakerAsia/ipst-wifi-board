#include <Arduino.h>
#include <WiFi.h>
#include <WiFiClient.h>
#include <WiFiAP.h>
#include <WebServer.h>

Number analogPin;
Number analogValue;

void setup()
{
  ledcSetup(0, 5000, 8);
  ledcAttachPin(18, 0);

  analogPin = 36;
  pinMode(18, OUTPUT);

}
void loop()
{
  analogValue = analogRead(analogPin);
  ledcWrite(0, (analogValue / 16));
}
