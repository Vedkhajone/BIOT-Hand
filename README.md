# 🤖 BIOT Hand – Bionic + IoT Powered Prosthetic Hand

A mini-project developed as part of our academic curriculum, **BIOT Hand** combines the power of **bionics (muscle signal control)** and **IoT (wireless app-based control)** to create a smart, responsive prosthetic hand. This project is a step toward affordable, adaptive, and remotely controllable prosthetics.

---

## 🔍 Project Overview

The BIOT Hand reads muscle activity using EMG sensors and triggers finger movement via servo motors based on detected muscle patterns. It also supports remote control via an IoT app interface, allowing commands to be sent wirelessly to the hand, useful in cases where muscle input is limited.

---

## ✨ Features

- 🎯 EMG-controlled movement using muscle signals
- 📱 IoT-based manual override via custom app (e.g., Blynk or Bluetooth-based control)
- 🔄 Dual-mode operation: Muscle-triggered and app-controlled
- 🛠️ 3D-printed lightweight prosthetic arm casing
- 💪 Real-time signal processing using ESP32 microcontroller
- ⚙️ Supports multiple gestures and finger movement patterns

---

## 🧰 Hardware Used

- **ESP32** (Wi-Fi + Bluetooth)
- **EMG Sensor Module** (5-pin: +Vs, GND, -Vs, SIG, GND)
- **ECG Sensor (AD8232)** for signal experimentation
- **Servo Motors** (SG90 or MG90s – 4 total)
- **3D Printed Prosthetic Hand** (designed and assembled manually)
- **9V Batteries** for separate sensor and motor power
- **Electrodes** for muscle signal acquisition

---

## 💻 Software & Libraries

- **Arduino IDE** for code development
- **ESP32 Board Core** for Arduino
- **ESP32Servo.h** library (alternative to Servo.h for ESP32)
- **IoT Platform**: Custom mobile app / Bluetooth / Blynk integration
- **3D Design**: Autodesk Fusion 360 / Tinkercad
- **Signal Visualization**: Arduino Serial Plotter

---

## 🧪 System Architecture

```plaintext
[EMG Sensor] ---> [ESP32] ---> [Servo Motors]
     ↓                  ↑
 [ECG/Signal Debug]     ↓
               [IoT App Control via Wi-Fi/Bluetooth]
```

 image here

 
🚀 How to Run
## Clone this repository.
- Open biot_hand.ino in Arduino IDE.
- Install required libraries and board manager for ESP32.
- Connect the EMG sensor and servo motors as per the wiring diagram.
- Upload the code while holding the BOOT button on ESP32.
- Launch your web app at http://192.168.4.1/ and control remotely!

## 📩 Want to Collaborate?
### If you're working on something similar in robotics, prosthetics, or IoT, feel free to open a discussion or drop a message. Let’s innovate together!

## 📜 License
This project is open-sourced. Feel free to fork, use, and modify with **credits**.

# Developer
## The Ved Khajone

