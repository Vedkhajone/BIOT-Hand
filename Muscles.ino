#include <ESP32Servo.h>

#define EMG_PIN 2     // EMG sensor connected to GPIO34 (analog pin)
#define SERVO_PIN 25    // Servo connected to GPIO25

Servo myServo;

int emgValue = 0;
int relaxThreshold = 160;  // EMG value when hand is relaxed
int contractThreshold = 300;  // EMG value when hand contracts
bool isHandContracted = false;  // Track movement state

void setup() {
  Serial.begin(115200);
  myServo.attach(SERVO_PIN);
  myServo.write(0);  // Start at 0°
  Serial.println("EMG Servo Control Initialized");
}

void loop() {
  emgValue = analogRead(EMG_PIN);  // Read EMG sensor value
  Serial.println("EMG Value: " + String(emgValue));

  if (emgValue < contractThreshold && !isHandContracted) {
    // Hand contracted (EMG < 1700) → Move to 180°
    myServo.write(180);
    isHandContracted = true;
    Serial.println("Hand Contracted! Servo at 180°");
  } 
  else if (emgValue > relaxThreshold && isHandContracted) {
    // Hand relaxed (EMG > 1900) → Move back to 0°
    myServo.write(0);
    isHandContracted = false;
    Serial.println("Hand Relaxed. Servo at 0°");
  }

  delay(500);  // Short delay for smooth response
}
