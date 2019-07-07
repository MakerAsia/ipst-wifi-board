#include <Arduino.h>
#include <WiFi.h>
#include <WiFiClient.h>
#include <WiFiAP.h>
#include <WebServer.h>

void setup()
{
  pinMode(0,INPUT_PULLUP);
  pinMode(18,OUTPUT);
}

void loop()
{
  if (digitalRead(0) == 0) {
    digitalWrite(18,1);
  } else {
    digitalWrite(18,0);
  }  
}
