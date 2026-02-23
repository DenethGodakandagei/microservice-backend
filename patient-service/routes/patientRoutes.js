const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Get all patients
router.get('/', patientController.getAllPatients);

// Handle address change request
router.put('/:id/address', patientController.updatePatientAddress);

// Endpoint to trigger age update manually for testing purposes
router.post('/trigger-age-update', patientController.triggerAgeUpdate);

module.exports = router;
