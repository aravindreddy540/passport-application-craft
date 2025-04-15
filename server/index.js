
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ds160-app')
  .then(() => console.log('MongoDB connection established'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define schema for DS-160 application
const ds160Schema = new mongoose.Schema({
  // Personal Information
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  middleName: { type: String },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  dateOfBirth: { type: Date, required: true },
  cityOfBirth: { type: String, required: true },
  countryOfBirth: { type: String, required: true },
  nationality: { type: String, required: true },
  
  // Contact Information
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  
  // Passport Information
  passportNumber: { type: String, required: true },
  passportIssuedCountry: { type: String, required: true },
  passportIssuedDate: { type: Date, required: true },
  passportExpiryDate: { type: Date, required: true },
  
  // Travel Information
  travelPurpose: { type: String, required: true },
  intendedArrivalDate: { type: Date, required: true },
  intendedStayDuration: { type: Number, required: true },
  usContactInfo: {
    name: String,
    organization: String,
    relationship: String,
    phone: String,
    email: String,
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String
    }
  },
  
  // Previous US Travel
  previousUSTravel: { type: Boolean, default: false },
  previousUSTravelDetails: [{
    arrivalDate: Date,
    departureDate: Date,
    lengthOfStay: Number
  }],
  
  // Employment Information
  employmentStatus: String,
  employer: {
    name: String,
    phone: String,
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    }
  },
  
  // Education Information
  educationLevel: String,
  schools: [{
    name: String,
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    },
    courseOfStudy: String,
    fromDate: Date,
    toDate: Date
  }],
  
  // Security Questions
  securityQuestions: {
    criminalOffense: Boolean,
    drugOffense: Boolean,
    terrorism: Boolean,
    visaFraud: Boolean,
    explanations: String
  },
  
  // Form Status
  formStatus: { 
    type: String, 
    enum: ['draft', 'completed', 'submitted'],
    default: 'draft'
  },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Create DS-160 model
const DS160 = mongoose.model('DS160', ds160Schema);

// API Routes
// Get all applications
app.get('/api/applications', async (req, res) => {
  try {
    const applications = await DS160.find();
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single application
app.get('/api/applications/:id', async (req, res) => {
  try {
    const application = await DS160.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new application
app.post('/api/applications', async (req, res) => {
  const application = new DS160(req.body);
  try {
    const newApplication = await application.save();
    res.status(201).json(newApplication);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an application
app.put('/api/applications/:id', async (req, res) => {
  try {
    req.body.updatedAt = new Date();
    const updatedApplication = await DS160.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true }
    );
    if (!updatedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json(updatedApplication);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an application
app.delete('/api/applications/:id', async (req, res) => {
  try {
    const application = await DS160.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json({ message: 'Application deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
