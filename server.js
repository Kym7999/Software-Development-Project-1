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
    host: 'localhost',
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

app.get('/patient-id-name', async (req, res) => {
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

app.get('/doctor-id-name', async (req, res) => {
    try {
        const connection = await mysql.createConnection(config);
        const [rows] = await connection.query('SELECT id, name FROM Staff WHERE role = ?', ['Doctor']);
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

        const insertQuery = 'INSERT INTO Patients (name, password, dob, address, phone, email, allergies) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [name, 'password', dob, address, phone, email, allergies];

        await connection.query(insertQuery, values);

        res.json({ message: 'Patient added successfully' });

        connection.end();
    } catch (err) {
        console.error('Error adding patient:', err);
        res.status(400).json({ message: 'Duplicate email address. Please use a unique email.' });
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

// Get medications by id
app.get('/get-medications-by-id', async (req, res) => {
    try {
        const { id } = req.query;
        const connection = await mysql.createConnection(config);
        const [rows] = await connection.query('SELECT * FROM Medications WHERE id = ?', [id]);
        res.json(rows);
        connection.end();
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Add Medication to Patient's record
app.post('/add-medication-to-patient', async (req, res) => {
    try {
        const { patientId, medicationId, delivery } = req.body;
        const connection = await mysql.createConnection(config);

        const insertQuery = 'INSERT INTO Prescriptions (patientId, medicationId, status, delivery) VALUES (?, ?, ?, ?)';
        const values = [patientId, medicationId, 'Pending', delivery];

        await connection.query(insertQuery, values);

        res.json({ message: 'Prescription added successfully' });

        connection.end();
    } catch (err) {
        console.log('Error: ', err);
    }
});

// Get Staff Schedule by Id
app.get('/get-schedules-by-id', async (req, res) => {
    try {
        const { id } = req.query;
        const connection = await mysql.createConnection(config);
        const [rows] = await connection.query('SELECT * FROM Schedules WHERE staffid = ?', id);        
        res.json(rows);
        connection.end();
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/get-schedules', async (req, res) => {
    try {
        const { id } = req.query;
        const connection = await mysql.createConnection(config);
        const [rows] = await connection.query('SELECT * FROM Schedules where staffid != ?', id);
        res.json(rows);
        connection.end();
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/create-appointment', async (req, res) => {
    try {
        const { patientId, doctorId, date, time } = req.body;
        const connection = await mysql.createConnection(config);

        const insertQuery = 'INSERT INTO Appointment (patientId, doctorId, date, time) VALUES (?, ?, ?, ?)';
        const values = [patientId, doctorId, date, time];

        await connection.query(insertQuery, values);

        res.json({ message: 'Appointment created successfully' });

        connection.end();
    } catch (err) {
        console.log('Error: ', err);
    }
});

app.get('/patient-appointment', async (req, res) => {
    try {
        const connection = await mysql.createConnection(config);
        const [rows] = await connection.query('SELECT * FROM Appointment');
        res.json(rows);
        connection.end();
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/loginStaff', async (req, res) => {
    try {
        const { email, password } = req.body;
        const connection = await mysql.createConnection(config);

        const [rows] = await connection.query('SELECT role, id FROM Staff WHERE email = ? AND password = ?', [email, password]);

        res.json(rows[0]);

        connection.end();
    } catch (err) {
        console.log('Error: ', err);
    }
});

app.post('/loginPatient', async (req, res) => {
    try {
        const { email, password } = req.body;
        const connection = await mysql.createConnection(config);

        const [rows] = await connection.query('SELECT * FROM Patients WHERE email = ? AND password = ?', [email, password]);

        res.json(rows[0]);

        connection.end();
    } catch (err) {
        console.log('Error in Server: ', err);
    }
});

app.put('/rescheduleappointment', async (req, res) => {
    try {
        const { patientId, appointmentId, newDate, newTime } = req.body;
        const connection = await mysql.createConnection(config);

        const updateQuery = 'UPDATE Appointment SET date = ?, time = ? WHERE id = ? AND patientId = ?';
        const values = [newDate, newTime, appointmentId, patientId];

        const [result] = await connection.query(updateQuery, values);

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Appointment not found or unauthorized to reschedule' });
        } else {
            res.json({ message: 'Appointment rescheduled successfully' });
        }

        connection.end();
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

app.delete('/appointmentscancel', async (req, res) => {
    try {
        const { appointmentId, patientId } = req.body;
        const connection = await mysql.createConnection(config);

        const deleteQuery = 'DELETE FROM Appointment WHERE id = ? AND patientId = ?';
        const values = [appointmentId, patientId];

        const [result] = await connection.query(deleteQuery, values);

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Appointment not found or unauthorized to delete' });
        } else {
            res.json({ message: 'Appointment deleted successfully' });
        }

        connection.end();
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/get-appointments-by-id', async (req, res) => {
    try {
        const { id } = req.query;
        const connection = await mysql.createConnection(config);
        const [rows] = await connection.query('SELECT * FROM Appointment WHERE patientid = ?', id);
        res.json(rows);
        connection.end();
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/refills', async (req, res) => {
    try {
        const { medicationName } = req.body;
        const connection = await mysql.createConnection(config);

        const insertQuery = 'INSERT INTO RefillRequests (medicationName) VALUES (?)';
        const values = [medicationName];

        await connection.query(insertQuery, values);

        res.json({ message: 'Refill request sent successfully' });

        connection.end();
    } catch (err) {
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
    try {
        const { patientId } = req.body;
        const connection = await mysql.createConnection(config);

        const deleteQuery = 'DELETE FROM Patients WHERE id = ?';
        const values = [patientId];

        await connection.query(deleteQuery, values);

        res.json({ message: 'Patient deleted successfully' });

        connection.end();
    } catch (err) {
        console.log('Error: ', err);
    }
});

app.post('/add-medication', async (req, res) => {
    try {
        const { name, type, dosage, form, stock } = req.body;
        const connection = await mysql.createConnection(config);

        const insertQuery = 'INSERT INTO Medications (name, type, dosage, form, stock) VALUES (?, ?, ?, ?, ?)';
        const values = [name, type, dosage, form, stock];

        await connection.query(insertQuery, values);

        res.json({ message: 'Medication added successfully' });

        connection.end();
    } catch (err) {
        console.log('Error: ', err);
    }
});


app.delete('/delete-medication', async (req, res) => {
    try {
        const { name } = req.body;
        const connection = await mysql.createConnection(config);

        const deleteQuery = 'DELETE FROM Medications WHERE name = ?';
        const values = [name];

        await connection.query(deleteQuery, values);

        res.json({ message: 'Medication deleted successfully' });

        connection.end();
    } catch (err) {
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

app.get('/getOrders', async (req, res) => {
    try {
        const connection = await mysql.createConnection(config);
        const [rows] = await connection.query('SELECT * FROM Prescriptions WHERE status != ?', ['Confirmed']);
        res.json(rows);
        connection.end();
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/get-prescriptions', async (req, res) => {
    try {
        const connection = await mysql.createConnection(config);
        const [rows] = await connection.query('SELECT * FROM Prescriptions');
        res.json(rows);
        connection.end();
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/get-prescriptions-by-id', async (req, res) => {
    try {
        const { id } = req.query;
        const connection = await mysql.createConnection(config);
        const [rows] = await connection.query('SELECT * FROM Prescriptions WHERE patientId = ?', [id]);
        res.json(rows);
        connection.end();
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.put('/update-prescription-status', async (req, res) => {
    try {
        const { patientId, medicationId, status } = req.body;
        const connection = await mysql.createConnection(config);

        const updateQuery = 'UPDATE Prescriptions SET status = ? WHERE patientId = ? AND medicationId = ?';
        const values = [status, patientId, medicationId];

        await connection.query(updateQuery, values);

        res.json({ message: 'Prescription updated successfully' });

        connection.end();
    } catch (err) {
        console.log('Error: ', err);
    }
});

app.delete('/delete-prescription', async (req, res) => {
    try {
        const { id } = req.body;
        const connection = await mysql.createConnection(config);

        const deleteQuery = 'DELETE FROM Prescriptions WHERE id = ?';
        const values = [id];
        
        await connection.query(deleteQuery, values);

        res.json({ message: 'Prescription deleted successfully' });

        connection.end();
    } catch (err) {
        console.log('Error: ', err);
    }
});

app.get('/get-refill-requests', async (req, res) => {
    try {
        const connection = await mysql.createConnection(config);
        const [rows] = await connection.query('SELECT * FROM RefillRequests');
        res.json(rows);
        connection.end();
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/get-refill-requests-incomplete', async (req, res) => {
    try {
        const connection = await mysql.createConnection(config);
        const [rows] = await connection.query('SELECT * FROM RefillRequests WHERE status = ?', ['Pending']);
        res.json(rows);
        connection.end();
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/request-refill', async (req, res) => {
    try {
      const { patientId, medicationId, quantity } = req.body;
      const connection = await mysql.createConnection(config);
  
      const checkQuery = 'SELECT * FROM RefillRequests WHERE patient_Id = ? AND medication_Id = ?';
      const checkValues = [patientId, medicationId];
  
      const [existingRequest] = await connection.query(checkQuery, checkValues);
  
      if (existingRequest.length > 0) {
        res.status(409).json({ message: 'Refill for this medication was requested recently. Please wait.' });
      } else {        
        const insertQuery = 'INSERT INTO RefillRequests (patient_Id, medication_Id, quantity) VALUES (?, ?, ?)';
        const values = [patientId, medicationId, quantity];
  
        await connection.query(insertQuery, values);
  
        res.json({ message: 'Refill requested successfully' });
      }
  
      connection.end();
    } catch (err) {
      console.log('Error: ', err);
      res.status(500).send('Internal Server Error');
    }
  });

app.put('/update-refillrequest-status', async (req, res) => {
    try {
        const { patientId, medicationId, status } = req.body;
        const connection = await mysql.createConnection(config);

        const updateQuery = 'UPDATE RefillRequests SET status = ? WHERE patient_id = ? AND medication_id = ?';
        const values = [status, patientId, medicationId];

        await connection.query(updateQuery, values);

        res.json({ message: 'Prescription updated successfully' });

        connection.end();
    } catch (err) {
        console.log('Error: ', err);
    }
});

app.post('/create-meal-plan', async (req, res) => {
    try {
        const { patientId, staffId,  targetCalories, nutrientGoals, foodsAvoid, hydrationGoals, notes } = req.body;
        const connection = await mysql.createConnection(config);

        const insertQuery = 'INSERT INTO MealPlan (patientId, staffId, targetCalories, nutrientGoals, foodsAvoid, hydrationGoals, notes) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [patientId, staffId,  targetCalories, nutrientGoals, foodsAvoid, hydrationGoals, notes];

        await connection.query(insertQuery, values);

        res.json({ message: 'Meal Plan created successfully' });

        connection.end();
    } catch (err) {
        console.log('Error: ', err);
    }
});

app.get('/get-meal-plans', async (req, res) => {
    try {
        const { id } = req.query;
        const connection = await mysql.createConnection(config);
        const [rows] = await connection.query('SELECT * FROM MealPlan WHERE staffId = ?', id);
        res.json(rows);
        connection.end();
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/update-meal-plan', async (req, res) => {
    try {
        const { id, patientId, targetCalories, nutrientGoals, foodsAvoid, hydrationGoals, notes } = req.body;
        const connection = await mysql.createConnection(config);

        const updateQuery = 'UPDATE MealPlan SET patientId = ?, targetCalories = ?, nutrientGoals = ?, foodsAvoid = ?, hydrationGoals = ?, notes = ? WHERE id = ?';
        const values = [patientId, targetCalories, nutrientGoals, foodsAvoid, hydrationGoals, notes, id];

        await connection.query(updateQuery, values);

        res.json({ message: 'Meal Plan updated successfully' });

        connection.end();
    } catch (err) {
        console.log('Error: ', err);
    }
});

app.delete('/delete-meal-plan', async (req, res) => {
    try {
        const { id } = req.body;
        const connection = await mysql.createConnection(config);

        const deleteQuery = 'DELETE FROM MealPlan WHERE id = ?';
        const values = [id];
        
        await connection.query(deleteQuery, values);

        res.json({ message: 'Meal Plan deleted successfully' });

        connection.end();
    } catch (err) {
        console.log('Error: ', err);
    }
});

app.get('/get-mealplan-by-id', async (req, res) => {
    try {
        const { id } = req.query;
        const connection = await mysql.createConnection(config);
        const [rows] = await connection.query('SELECT * FROM MealPlan WHERE patientId = ?', [id]);
        res.json(rows);
        connection.end();
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/get-exercise-plans', async (req, res) => {
    try {
        const { id } = req.query;
        const connection = await mysql.createConnection(config);
        const [rows] = await connection.query('SELECT * FROM ExercisePlan WHERE staffId = ?', [id]);
        res.json(rows);
        connection.end();
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/create-exercise-plan', async (req, res) => {
    try {
        const { patientId, staffId, fitnessGoals, exercises, weeklySchedule, duration, notes } = req.body;
        const connection = await mysql.createConnection(config);

        const insertQuery = 'INSERT INTO ExercisePlan (patientId, staffId, fitnessGoals, exercises, weeklySchedule, duration, notes) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [patientId, staffId, fitnessGoals, exercises, weeklySchedule, duration, notes];

        await connection.query(insertQuery, values);

        res.json({ message: 'Exercise Plan created successfully' });

        connection.end();
    } catch (err) {
        console.log('Error: ', err);
    }
});

app.post('/update-exercise-plan', async (req, res) => {
    try {
        const { id, patientId, fitnessGoals, exercises, weeklySchedule, duration, notes } = req.body;
        const connection = await mysql.createConnection(config);

        const updateQuery = 'UPDATE ExercisePlan SET patientId = ?, fitnessGoals = ?, exercises = ?, weeklySchedule = ?, duration = ?, notes = ? WHERE id = ?';
        const values = [patientId, fitnessGoals, exercises, weeklySchedule, duration, notes, id];

        await connection.query(updateQuery, values);

        res.json({ message: 'Exercise Plan updated successfully' });

        connection.end();
    } catch (err) {
        console.log('Error: ', err);
    }
});

app.delete('/delete-exercise-plan', async (req, res) => {
    try {
        const { id } = req.body;
        const connection = await mysql.createConnection(config);

        const deleteQuery = 'DELETE FROM ExercisePlan WHERE id = ?';
        const values = [id];
        
        await connection.query(deleteQuery, values);

        res.json({ message: 'Exercise Plan deleted successfully' });

        connection.end();
    } catch (err) {
        console.log('Error: ', err);
    }
});

app.get('/get-exercise-by-id', async (req, res) => {
    try {
        const { id } = req.query;
        const connection = await mysql.createConnection(config);
        const [rows] = await connection.query('SELECT * FROM ExercisePlan WHERE patientId = ?', [id]);
        res.json(rows);
        connection.end();
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/update-medication-stock', async (req, res) => {
    try {
        const { id, stock } = req.body;
        const connection = await mysql.createConnection(config);
                
        const updateQuery = 'UPDATE Medications SET stock = ? WHERE id = ?';
        const values = [stock, id];

        await connection.query(updateQuery, values);

        res.json({ message: 'Stock updated successfully' });

        connection.end();
    } catch (err) {
        console.log('Error: ', err);
    }
});

let server = app.listen(5000, function () {
    console.log('Server is listening at port 5000...');
});