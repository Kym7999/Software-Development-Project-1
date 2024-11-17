showMedicalHistory();
async function showMedicalHistory(){
    const urlParams = new URLSearchParams(window.location.search);
    const patient = JSON.parse(decodeURIComponent(urlParams.get('patient')));
    const response = await fetch(`http://localhost:5000/get-patient-medical-history?id=${patient.id}`);
    const history = await response.json();    

    displayMedicalHistory(patient, history);
}

function displayMedicalHistory(patient, history) {

    const patientName = document.getElementById('patientName');    
    const patientDob = document.getElementById('patientDOB');    
    const patientAllergies = document.getElementById('patientAllergies');
    patientName.textContent = `Name: ${patient.name}`;
    patientDob.textContent = `Date of Birth: ${patient.dob}`;    
    patientAllergies.textContent = `Allergies: ${patient.allergies}`;  


    const historyTable = document.getElementById('historyTable');   

    while (historyTable.rows.length > 1) { // Keep the header row (index 0)
        historyTable.deleteRow(1);
    }
    
    history.forEach(record => {
        const row = historyTable.insertRow();
        const dateCell = row.insertCell(0);
        const diagnosisCell = row.insertCell(1);
        const symptomsCell = row.insertCell(2);
        const treatmentCell = row.insertCell(3);
        const notesCell = row.insertCell(4);

        dateCell.textContent = record.date.split('T')[0];
        diagnosisCell.textContent = record.diagnosis;
        symptomsCell.textContent = record.symptoms;
        treatmentCell.textContent = record.treatment;
        notesCell.textContent = record.notes;
    });
}