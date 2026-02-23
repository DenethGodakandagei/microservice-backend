const express = require('express');
const cors = require('cors');
const patientRoutes = require('./routes/patientRoutes');
const { initCronJobs } = require('./jobs/cronJobs');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

// Initialize Cron Jobs
initCronJobs();

// Routes
app.get('/', (req, res) => {
    res.send('Patient Service is running');
});
app.use('/api/patients', patientRoutes);

app.listen(PORT, () => {
    console.log(`Patient Service is running on port ${PORT}`);
});
