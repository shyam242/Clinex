const diagnosisList = [
  {
    symptoms: ["fever", "cough", "headache"],
    message: "You might have Flu."
  },
  {
    symptoms: ["fever", "cough", "breathlessness"],
    message: "You might have COVID-19."
  },
  {
    symptoms: ["chest pain", "shortness of breath"],
    message: "You might be experiencing a Heart Attack."
  },
  {
    symptoms: ["sore throat", "runny nose"],
    message: "You might have a Common Cold."
  },
  {
    symptoms: ["itchy eyes", "runny nose", "sneezing"],
    message: "You might have Allergic Rhinitis (Hay Fever)."
  },
  {
    symptoms: ["headache", "sensitivity to light", "nausea"],
    message: "You might have a Migraine."
  },
  {
    symptoms: ["abdominal pain", "bloating", "diarrhea"],
    message: "You might have Gastroenteritis."
  },
  {
    symptoms: ["joint pain", "fever", "rash"],
    message: "You might have Dengue Fever."
  },
  {
    symptoms: ["fever", "chills", "sweating"],
    message: "You might have Malaria."
  },
  {
    symptoms: ["frequent urination", "thirst", "fatigue"],
    message: "You might have Type 2 Diabetes."
  },
  {
    symptoms: ["weight loss", "palpitations", "heat intolerance"],
    message: "You might have Hyperthyroidism."
  },
  {
    symptoms: ["weight gain", "fatigue", "cold intolerance"],
    message: "You might have Hypothyroidism."
  },
  {
    symptoms: ["chest pain", "nausea", "dizziness"],
    message: "You might have Angina."
  },
  {
    symptoms: ["dry cough", "wheezing", "chest tightness"],
    message: "You might have Asthma."
  },
  {
    symptoms: ["persistent sadness", "loss of interest", "fatigue"],
    message: "You might be experiencing Depression."
  },
  {
    symptoms: ["difficulty concentrating", "forgetfulness", "confusion"],
    message: "You might have Early signs of Dementia."
  },
  {
    symptoms: ["night sweats", "weight loss", "persistent cough"],
    message: "You might have Tuberculosis."
  },
  {
    symptoms: ["numbness", "tingling", "muscle weakness"],
    message: "You might have a Neurological Disorder (e.g., Multiple Sclerosis)."
  },
  {
    symptoms: ["frequent headaches", "high blood pressure", "dizziness"],
    message: "You might have Hypertension."
  },
  {
    symptoms: ["rash", "fever", "joint pain"],
    message: "You might have Chikungunya."
  }
];
function sendMessage() {
  const input = document.getElementById('user-input').value.trim();
  if (!input) return;

  addMessage(input, 'user');
  document.getElementById('user-input').value = '';

  const diagnosis = getDiagnosis(input);
  setTimeout(() => addMessage(diagnosis, 'bot'), 500);
}
function getDiagnosis(userInput) {
  const inputSymptoms = userInput.toLowerCase().split(",").map(s => s.trim());
  let bestMatch = null;
  let bestScore = 0;

  for (const diagnosis of diagnosisList) {
    const setA = new Set(inputSymptoms);
    const setB = new Set(diagnosis.symptoms.map(s => s.toLowerCase().trim()));
    
    const intersection = new Set([...setA].filter(symptom => setB.has(symptom)));
    const union = new Set([...setA, ...setB]);
    
    const similarity = intersection.size / union.size;

    if (similarity > bestScore && similarity >= 0.4) {
      bestScore = similarity;
      bestMatch = diagnosis.message;
    }
  }

  return bestMatch || "Sorry, we couldn't identify your condition. Please consult a doctor.";
}
function addMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}`;
  messageDiv.innerText = text;

  const chatBox = document.getElementById('chat-box');
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
