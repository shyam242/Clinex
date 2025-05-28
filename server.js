// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/medical-form", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.log("❌ MongoDB connection error:", err));


// Schema
const FormSchema = new mongoose.Schema({
  uid: String,  // <-- Firebase UID
  gender: String,
  weight: String,
  height: String,
  age: String,
  bloodGroup: String,
  symptoms: String,
  medications: String,
  medicalIssues: String
});


const Form = mongoose.model('Form', FormSchema);

// POST route
app.post('/submit', async (req, res) => {
  try {
    console.log("📥 Incoming Data:", req.body);
    const newForm = new Form(req.body);
    await newForm.save();
    res.json({ message: '✅ Data saved successfully!' });
  } catch (err) {
    console.error("❌ Error saving form:", err);
    res.status(500).json({ 
      error: '❌ Failed to save data.',
      details: err.message  // <--- This will reveal what's wrong
    });
  }
});
app.get('/user/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    const userData = await Form.findOne({ uid }).sort({ _id: -1 }); // get latest
    if (userData) {
      res.json(userData);
    } else {
      res.status(404).json({ error: "User data not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
