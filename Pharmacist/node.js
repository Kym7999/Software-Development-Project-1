//This is back end to handle log-stocks


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Example data storage
let medications = [
    { id: 1, name: "Lorazepam 2mg", quantity: 100 },
    { id: 2, name: "Omeprazole 20mg", quantity: 10 },
    { id: 3, name: "Ranitidine 150mg", quantity: 30 },
    { id: 4, name: "Ativan 1mg", quantity: 50 }
];

let stockLog = []; // Logs for auditing

// Update Medication Stock
app.put('/update-medication-stock', (req, res) => {
    const { id, stock } = req.body;
    const medication = medications.find(med => med.id == id);
    
    if (!medication) {
        return res.status(404).send('Medication not found');
    }

    medication.quantity = stock;
    res.status(200).send('Stock updated successfully');
});

// Log Stock Changes
app.post('/log-stock-change', (req, res) => {
    const { medicationId, newStock, timestamp, updatedBy } = req.body;
    
    stockLog.push({ medicationId, newStock, timestamp, updatedBy });
    
    res.status(200).send('Stock change logged successfully');
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
