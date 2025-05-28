import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;

    nextBtn.addEventListener("click", () => {
      // ...existing data collection...
      const formData = {
        uid, // ✅ attach Firebase UID
        gender, weight, height, age, bloodGroup,
        symptoms, medications, medicalIssues
      };

      fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }).then(res => res.json())
        .then(data => {
          console.log(data);
          window.location.href = '/dashboard.html';
        });
    });
  } else {
    // User not logged in, redirect to login
    window.location.href = '/login.html';
  }
});
