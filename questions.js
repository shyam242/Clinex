const steps = document.querySelectorAll(".form-step");
const stepIndicators = document.querySelectorAll(".step");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let currentStep = 0;

function showStep(step) {
  steps.forEach((s, i) => s.classList.toggle("active", i === step));
  stepIndicators.forEach((circle, i) => {
    circle.classList.toggle("active", i <= step);
  });

  prevBtn.style.display = step === 0 ? "none" : "inline-block";
  nextBtn.textContent = step === steps.length - 1 ? "Submit ✔️" : "Next →";
}

// ✅ Combined and cleaned `nextBtn` handler
nextBtn.addEventListener("click", () => {
  if (currentStep < steps.length - 1) {
    currentStep++;
    showStep(currentStep);
  } else {
    // ✅ Collect form data
    const gender = document.querySelector('.gender-btn.active')?.textContent || "";
    const weight = document.querySelector('input[placeholder*="65"]')?.value || "";
    const height = document.querySelector('input[placeholder*="170"]')?.value || "";
    const age = document.querySelector('input[placeholder*="25"]')?.value || "";
    const bloodGroup = document.querySelector('select')?.value || "";
    const symptoms = document.querySelectorAll('textarea')[0]?.value || "";
    const medications = document.querySelectorAll('textarea')[1]?.value || "";
    const medicalIssues = document.querySelectorAll('textarea')[2]?.value || "";

    const formData = {
      gender, weight, height, age, bloodGroup,
      symptoms, medications, medicalIssues
    };

    // ✅ Send to server
    fetch('http://localhost:3000/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then(res => res.json())
      .then(data => {
        // alert("✅ Data submitted successfully!");
        console.log(data);
        window.location.href='/dashboard.html';
      })
      .catch(err => {
        alert("❌ Error submitting data.");
        console.error(err);
      });
  }
});

// ✅ Gender selection logic
document.querySelectorAll('.gender-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ✅ Back button
prevBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
});

showStep(currentStep);
