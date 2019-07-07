#include <Arduino.h>
#include <WiFi.h>
#include <WiFiClient.h>
#include <WiFiAP.h>
#include <WebServer.h>

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

void setup()
{
  /* setup code */

  /* block setup */
  pinMode(18, OUTPUT);
  pinMode(0, INPUT_PULLUP);
}

void loop()
{
  if (digitalRead(0) == 0) {
    digitalWrite(18, 1);
    tone(BUZZER_PIN, 262, 250);
  } else {
    digitalWrite(18, 0);
  }
}
