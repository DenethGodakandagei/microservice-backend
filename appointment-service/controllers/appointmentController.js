const { appointments, doctors } = require('../models/appointmentModel');
const axios = require('axios');

const PATIENT_SERVICE_URL = process.env.PATIENT_SERVICE_URL || 'http://localhost:3001';

const getAllAppointments = async (req, res) => {
    try {
        // Fetch all patients from Patient Service
        const patientResponse = await axios.get(`${PATIENT_SERVICE_URL}/api/patients`);
        const patients = patientResponse.data;

        // Map appointments and attach patient details
        const enrichedAppointments = appointments.map(appointment => {
            const patientDetails = patients.find(p => p.patientId === appointment.patientId);
            return {
                ...appointment,
                patient: patientDetails || null
            };
        });

        res.json(enrichedAppointments);
    } catch (error) {
        console.error('Error fetching patient data for appointments:', error.message);
        // Fallback: return appointments without patient data if patient service is down
        res.json(appointments);
    }
};

const checkAvailability = (req, res) => {
    const { doctorName, date } = req.query;

    if (!doctorName || !date) {
        return res.status(400).json({ error: 'Doctor name and date are required query parameters' });
    }

    const doctor = doctors.find(d => d.name === doctorName);

    if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found' });
    }

    const availableSlots = doctor.schedule[date] || [];

    res.json({
        doctorName,
        date,
        availableSlots
    });
};

const cancelAppointment = (req, res) => {
    const { id } = req.params;

    const appointmentIndex = appointments.findIndex(a => a.appointmentId === id);

    if (appointmentIndex === -1) {
        return res.status(404).json({ error: 'Appointment not found' });
    }

    const cancelledAppointment = appointments.splice(appointmentIndex, 1)[0];

    // In a real system, you would also add the slot back to the doctor's availability
    const doctor = doctors.find(d => d.name === cancelledAppointment.doctorName);
    if (doctor && doctor.schedule[cancelledAppointment.date]) {
        doctor.schedule[cancelledAppointment.date].push(cancelledAppointment.time);
        // Sort times simply for neatness
        doctor.schedule[cancelledAppointment.date].sort();
    }

    res.json({ message: 'Appointment cancelled successfully', cancelledAppointment });
};

module.exports = {
    getAllAppointments,
    checkAvailability,
    cancelAppointment
};
