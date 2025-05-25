#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <ESP32Servo.h>

// Wi-Fi credentials
const char *ssid = "Bionic";
const char *password = "1234567890";

// Web server
AsyncWebServer server(80);

// Servo Pins
const int servoPins[4] = {5, 18, 19, 21}; // Servo control pins
Servo servos[4];
int servoAngles[4] = {0, 0, 0, 0}; // Current angles of the servos

// Function to handle predefined finger designs
void setFingerDesign(int design) {
  switch (design) {
    case 1: // Closed Fist
  servos[0].write(150);  // Close the thumb
  servos[1].write(180);  // Close the index finger
  servos[2].write(180);  // Close the middle finger
  servos[3].write(180);  // Close the ring finger
  break;
    case 2: //one
      servos[0].write(150);
      servos[1].write(0);
      servos[2].write(180);
      servos[3].write(180);
      break;
    case 3: // OK Gesture
      servos[0].write(135);
      servos[1].write(180);
      servos[2].write(0);
      servos[3].write(0);
      break;
    case 4: // Open
      for (int i = 0; i < 4; i++) servos[i].write(0);
      break;
    case 5: // Peace Sign
      servos[0].write(150);
      servos[1].write(0);
      servos[2].write(0);
      servos[3].write(180);
      break;
  }
}

// Function to generate the HTML webpage
String createWebPage() {
  String page = "<!DOCTYPE html><html><head><title>Bionic Hand</title></head><body>";
  page += "<h1>Bionic Hand Control</h1>";

  // Add sliders for manual control
  for (int i = 0; i < 4; i++) {
    page += "<label>Finger " + String(i + 1) + ":</label>";
    page += "<input type='range' id='servo" + String(i) + "' min='0' max='" + (i == 0 ? "150" : "180") +
            "' value='" + String(servoAngles[i]) + "' oninput='updateValue(" + String(i) + ")'>";
    page += "<span id='servo" + String(i) + "Value'>" + String(servoAngles[i]) + "</span><br><br>";
  }

  // Add buttons for predefined designs
  page += "<h2>Finger Designs</h2>";
  page += "<button onclick='setFingerDesign(1)'>Fist</button><br><br>";
  page += "<button onclick='setFingerDesign(2)'>One</button><br><br>";
  page += "<button onclick='setFingerDesign(3)'>OK</button><br><br>";
  page += "<button onclick='setFingerDesign(4)'>Open</button><br><br>";
  page += "<button onclick='setFingerDesign(5)'>Peace Sign</button><br><br>";

  // Add JavaScript for interaction
  page += "<script>";
  page += "function updateValue(servo) {";
  page += "  var slider = document.getElementById('servo' + servo);";
  page += "  document.getElementById('servo' + servo + 'Value').innerText = slider.value;";
  page += "  var xhr = new XMLHttpRequest();";
  page += "  xhr.open('GET', '/update?servo=' + servo + '&angle=' + slider.value, true);";
  page += "  xhr.send();";
  page += "}";
  page += "function setFingerDesign(design) {";
  page += "  var xhr = new XMLHttpRequest();";
  page += "  xhr.open('GET', '/finger' + design, true);";
  page += "  xhr.send();";
  page += "}";
  page += "</script></body></html>";

  return page;
}

void setup() {
  Serial.begin(115200);

  // Attach servos
  for (int i = 0; i < 4; i++) {
    servos[i].attach(servoPins[i]);
    servos[i].write(servoAngles[i]);
  }

  // Configure Wi-Fi
  WiFi.softAP(ssid, password);
  Serial.println("Wi-Fi started.");
  Serial.print("IP Address: ");
  Serial.println(WiFi.softAPIP());

  // Serve the web app
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send(200, "text/html", createWebPage());
  });

  // Handle servo updates
  server.on("/update", HTTP_GET, [](AsyncWebServerRequest *request) {
    if (request->hasParam("servo") && request->hasParam("angle")) {
      int servoIndex = request->getParam("servo")->value().toInt();
      int servoAngle = request->getParam("angle")->value().toInt();

      // Limit the first slider to 150 degrees
      if (servoIndex == 0 && servoAngle > 150) {
        servoAngle = 150;
      }

      servoAngles[servoIndex] = servoAngle;
      servos[servoIndex].write(servoAngle);
      request->send(200, "text/plain", "Servo updated");
    } else {
      request->send(400, "text/plain", "Invalid parameters");
    }
  });

  // Handle finger design buttons
  for (int i = 1; i <= 5; i++) {
    server.on(("/finger" + String(i)).c_str(), HTTP_GET, [i](AsyncWebServerRequest *request) {
      setFingerDesign(i);
      request->send(200, "text/plain", "Finger Design " + String(i) + " Set");
      Serial.print("Finger design ");
      Serial.print(i);
      Serial.println(" triggered.");
    });
  }

  server.begin();
}
void loop() {
  // Nothing needed here as AsyncWebServer handles requests
}
