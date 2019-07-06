#include <Arduino.h>
#include <WiFi.h>
#include <WiFiClient.h>
#include <WiFiAP.h>
#include <WebServer.h>

int i;
int j;

void setup()
{
  ledcSetup(0, 5000, 8);
  ledcAttachPin(18, 0);

  pinMode(18, OUTPUT);
}
void loop()
{
  for (i = 0; i <= 1023; i += 11) {
    ledcWrite(0, i);
    delay(50);
  }
  for (j = 1023; j >= 0; j -= 11) {
    ledcWrite(0, j);
    delay(50);
  }
}
