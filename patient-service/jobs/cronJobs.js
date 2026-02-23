const cron = require('node-cron');
const { patients } = require('../models/patientModel');

const initCronJobs = () => {
    // a. Write a function to update the age automatically every year in the system instead of manual update.
    // Using node-cron to run a task on Jan 1st at 00:00 every year
    cron.schedule('0 0 1 1 *', () => {
        console.log('Running annual age update task...');
        patients.forEach(patient => {
            patient.age += 1;
        });
        console.log('Age updated successfully for all patients.');
    });
};

module.exports = {
    initCronJobs
};
