# 🤖 Clinex - Your AI-Powered Personal Health Assistant

Clinex is an AI-enabled health assistant web application designed to provide users with instant medical guidance based on their symptoms. It aims to bridge the accessibility gap in early diagnosis using a simple interface, secure authentication, and AI-driven decision-making.

---

## 🚀 Overview

Clinex empowers users to:
- Input symptoms through a user-friendly interface.
- Instantly get recommendations using predefined logic and AI inference.
- Securely register and manage their profile.
- Access future AI-based chatbot support and teleconsultation (under development).

---

## 🧩 Features

- 🔐 **Authentication**: Secure sign-up and login with Firebase Authentication.
- 📋 **Health Assistant Dashboard**: A clean dashboard where users input symptoms and get results.
- 🧠 **AI Recommendation System**: Matches symptoms with common health conditions (currently rules-based with GPT integration planned).
- 📈 **Expandable Architecture**: Scalable and modular for future AI chatbot, report downloads, and live consults.

---

## 🌐 Tech Stack

| Layer         | Technology                       |
|---------------|----------------------------------|
| Frontend      | HTML, CSS, JavaScript            |
| Backend       | Node.js, Express.js              |
| Authentication| Firebase Authentication          |
| Database      | MongoDB (for user profile data)  |
| AI Logic      | Rules-based matching (GPT planned) |

---


---

## 🔄 System Workflow

```mermaid
graph TD
  A[User Lands on Clinex Homepage] --> B{Already Registered?}
  B -- Yes --> C[Login Page]
  B -- No --> D[Signup Page]
  C --> E[Dashboard / Health Assistant]
  D --> E[Dashboard / Health Assistant]
  E --> F[User Inputs Symptoms]
  F --> G[Predefined Symptoms List]
  G --> H[AI Matches Symptoms with Conditions]
  H --> I[Display Diagnosis Message]
  I --> K{Need Further Help?}
  K -- Yes --> L[Redirect to Chat Support]
  K -- No --> M[End Session]



