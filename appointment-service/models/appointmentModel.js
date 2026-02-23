// In-memory Appointment Data Store
let appointments = [
    {
        appointmentId: 'A001',
        patientId: 'P001',
        date: '2026-03-01',
        time: '10:00 AM',
        doctorName: 'Dr. Smith'
    },
    {
        appointmentId: 'A002',
        patientId: 'P002',
        date: '2026-03-01',
        time: '11:00 AM',
        doctorName: 'Dr. Jones'
    }
];

// In-memory Doctor Availability Data Store
const doctors = [
    {
        name: 'Dr. Smith',
        schedule: {
            '2026-03-01': ['09:00 AM', '11:00 AM', '02:00 PM'] // 10:00 AM is booked
        }
    },
    {
        name: 'Dr. Jones',
        schedule: {
            '2026-03-01': ['09:00 AM', '10:00 AM', '02:00 PM'] // 11:00 AM is booked
        }
    }
];

module.exports = {
    appointments,
    doctors
};
