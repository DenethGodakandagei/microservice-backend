const { patients } = require('../models/patientModel');

const getAllPatients = (req, res) => {
    res.json(patients);
};

const updatePatientAddress = (req, res) => {
    const { id } = req.params;
    const { newAddress } = req.body;

    if (!newAddress) {
        return res.status(400).json({ error: 'New address is required' });
    }

    const patient = patients.find(p => p.patientId === id);

    if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
    }

    patient.address = newAddress;
    res.json({ message: 'Address updated successfully', patient });
};

const triggerAgeUpdate = (req, res) => {
    patients.forEach(patient => {
        patient.age += 1;
    });
    res.json({ message: 'Age updated manually for all patients (Testing Purpose)', patients });
};

module.exports = {
    getAllPatients,
    updatePatientAddress,
    triggerAgeUpdate
};
