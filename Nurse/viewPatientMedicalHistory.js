loadPatients();
async function loadPatients(){
    try {
        const response = await fetch('http://localhost:5000/patients-id-name');
        const patients = await response.json();
      
        const options = patients.map(patient => {
          return {
            value: patient.id,
            text: `${patient.name}, ID: ${patient.id}`
          };
        });
      
        const patientSelect = document.getElementById('patient');
        options.forEach(option => {
          const newOption = document.createElement('option');
          newOption.value = option.value;
          newOption.text = option.text;
          patientSelect.appendChild(newOption);
        });
      
      } catch (error) {
        console.error('Error:', error);
      }
}

async function showPatient(){
    const option = document.getElementById('patient').value;
    const patientId = option.split("ID: ");
    const response = await fetch(`http://localhost:5000/get-patient-by-id?id=${patientId}`);
    const patient = await response.json();    

    const nameInput = document.getElementById('name');
    const dobInput = document.getElementById('dob');
    const addressInput = document.getElementById('address');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');

    const allergiesInput = document.getElementById('allergies');
    
    nameInput.value = patient.name;
    dobInput.value = patient.dob;
    addressInput.value = patient.address;
    phoneInput.value = patient.phone;
    emailInput.value = patient.email;
    allergiesInput.value = patient.allergies;
}

// Working
async function showMedicalHistory(){
    const option = document.getElementById('patient').value;
    const patientId = option.split("ID: ");
    const response = await fetch(`http://localhost:5000/get-patient-medical-history?id=${patientId}`);
    const history = await response.json();    

    displayMedicalHistory(history);
}

function displayMedicalHistory(history) {
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