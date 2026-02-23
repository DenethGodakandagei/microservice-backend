const express = require('express');
const cors = require('cors');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3002;

// Routes
app.get('/', (req, res) => {
    res.send('Appointment Service is running');
});
app.use('/api/appointments', appointmentRoutes);

app.listen(PORT, () => {
    console.log(`Appointment Service is running on port ${PORT}`);
});
