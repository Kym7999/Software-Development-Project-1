const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');

const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));

app.use(bodyParser.json());

const config = {
    host: 'MSI',
    user: 'root',
    password: 'admin',
    database: 'SQLServer4ClinicApp'
};

// Get all patients
app.get('/get-patients', async (req, res) => {
    try {
        const connection = await mysql.createConnection(config);

        const [rows] = await connection.query('SELECT * FROM Patients');

        res.json(rows);

        connection.end();
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Add a new patient
app.post('/add-patient', async (req, res) => {
    const { name, dob, address, phone, email, allergies } = req.body;    

    try {
        const connection = await mysql.createConnection(config);

        const insertQuery = 'INSERT INTO Patients (name, dob, address, phone, email, allergies) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [name, dob, address, phone, email, allergies];

        await connection.query(insertQuery, values);

        res.json({ message: 'Patient added successfully' });

        connection.end();
    } catch (err) {
        console.error('Error adding patient:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Get all medications
app.get('/get-medications', async (req, res) => {
    try {
        const connection = await mysql.createConnection(config);
        const [rows] = await connection.query('SELECT * FROM Medications');
        res.json(rows);
        connection.end();
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Add Medication to Patient's record
app.post('/add-medication-to-patient', async (req, res) => {
    try{
        const { patientId, medicationId } = req.body; 
        const connection = await mysql.createConnection(config);

        const insertQuery = 'INSERT INTO Prescriptions (patientId, medicationId) VALUES (?, ?)';
        const values = [patientId, medicationId];

        await connection.query(insertQuery, values);

        res.json({ message: 'Prescription added successfully' });

        connection.end();
    } catch (err){
        console.log('Error: ', err);
    }
});

// Get Staff Schedule by Id
app.get('/get-schedules-by-id', async (req, res) => {
    try {
        const connection = await mysql.createConnection(config);
        const [rows] = await connection.query('SELECT * FROM Schedules');
        res.json(rows);
        connection.end();
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/create-appointment', async (req, res) => {
    try{
        const { patientId, doctorId, date, time } = req.body;
        const connection = await mysql.createConnection(config);

        const insertQuery = 'INSERT INTO Appointment (patientId, doctorId, date, time) VALUES (?, ?, ?, ?)';
        const values = [patientId, doctorId, date, time];

        await connection.query(insertQuery, values);

        res.json({ message: 'Appointment created successfully' });

        connection.end();
    } catch (err){
        console.log('Error: ', err);
    }
});



let server = app.listen(5000, function () {
    console.log('Server is listening at port 5000...');
});