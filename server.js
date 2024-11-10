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

app.get('/patients-id-name', async (req, res) => {
    try {
        const connection = await mysql.createConnection(config);
        const [rows] = await connection.query('SELECT id, name FROM Patients');
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

app.post('/login', async (req, res) => {
    try{
        const { email, password } = req.body;
        const connection = await mysql.createConnection(config);

        const [rows] = await connection.query('SELECT role FROM User WHERE email = ? AND password = ?', [email, password]);

        res.json(rows[0]);

        connection.end();
    } catch (err){
        console.log('Error: ', err);
    }
});

app.put('/rescheduleappointment', async (req, res) => {
    try{
        const { appointmentId, newDate, newTime } = req.body;
        const connection = await mysql.createConnection(config);

        const updateQuery = 'UPDATE Appointment SET date = ?, time = ? WHERE id = ?';
        const values = [newDate, newTime, appointmentId];

        await connection.query(updateQuery, values);

        res.json({ message: 'Appointment rescheduled successfully' });

        connection.end();
    } catch (err){
        console.log('Error: ', err);
    }
});

app.delete('/appointmentscancel', async (req, res) => {
    try{
        const { appointmentId } = req.body;
        const connection = await mysql.createConnection(config);

        const deleteQuery = 'DELETE FROM Appointment WHERE id = ?';
        const values = [appointmentId];

        await connection.query(deleteQuery, values);

        res.json({ message: 'Appointment deleted successfully' });

        connection.end();
    } catch (err){
        console.log('Error: ', err);
    }
});

app.post('/refills', async (req, res) => {
    try{
        const { medicationName } = req.body;
        const connection = await mysql.createConnection(config);

        const insertQuery = 'INSERT INTO RefillRequests (medicationName) VALUES (?)';
        const values = [medicationName];

        await connection.query(insertQuery, values);

        res.json({ message: 'Refill request sent successfully' });

        connection.end();
    } catch (err){
        console.log('Error: ', err);
    }
});

app.get('/get-patient-by-id', async (req, res) => {
    try {
        const { id } = req.query; 
        const connection = await mysql.createConnection(config);
        const [rows] = await connection.query('SELECT * FROM Patients WHERE id = ?', [id]);
        res.json(rows[0]);
        connection.end();
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).json({ error: 'Internal Server Error' }); 
    }
});

app.post('/update-patient', async (req, res) => {
    try {
        const { id, name, dob, address, phone, email, allergies } = req.body;
        const connection = await mysql.createConnection(config);

        const updateQuery = 'UPDATE Patients SET name = ?, dob = ?, address = ?, phone = ?, email = ?, allergies = ? WHERE id = ?';
        const values = [name, dob, address, phone, email, allergies, id];

        await connection.query(updateQuery, values);

        res.json({ message: 'Patient updated successfully' });

        connection.end();
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/deletepatient', async (req, res) => {
    try{
        const { patientId } = req.body;
        const connection = await mysql.createConnection(config);

        const deleteQuery = 'DELETE FROM Patients WHERE id = ?';
        const values = [patientId];

        await connection.query(deleteQuery, values);

        res.json({ message: 'Patient deleted successfully' });

        connection.end();
    } catch (err){
        console.log('Error: ', err);
    }
});

app.post('/add-medication', async (req, res) => {
    try{
        const { name, type, dosage, form, stock } = req.body;
        const connection = await mysql.createConnection(config);

        const insertQuery = 'INSERT INTO Medications (name, type, dosage, form, stock) VALUES (?, ?, ?, ?, ?)';
        const values = [name, type, dosage, form, stock];

        await connection.query(insertQuery, values);

        res.json({ message: 'Medication added successfully' });

        connection.end();
    } catch (err){
        console.log('Error: ', err);
    }
});

app.get('/get-patient-medical-history', async (req, res) => {
    try {
        const { id } = req.query; 
        const connection = await mysql.createConnection(config);
        const [rows] = await connection.query('SELECT * FROM MedicalHistory WHERE patient_Id = ?', [id]);
        res.json(rows);
        connection.end();
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).json({ error: 'Internal Server Error' }); 
    }
});


let server = app.listen(5000, function () {
    console.log('Server is listening at port 5000...');
});