const patientSearch = document.getElementById('patientSearch');
const patientSelect = document.getElementById('patientSelect');

const medicationSearch = document.getElementById('medicationSearch');
const medicationSelect = document.getElementById('medicationSelect');

var patients;
var medications;

async function fetchPatientsAndMedications() {
    try {
        const response = await fetch('http://localhost:5000/get-patients');
        patients = await response.json();        
        displayPatients(patients);

        const response2 = await fetch('http://localhost:5000/get-medications');
        medications = await response2.json();      
        displayMedications(medications);  
    } catch (err) {
        console.error('Error fetching data', err);
    }
}

function displayPatients(patients) {    
    patientSelect.innerHTML = '';
    patients.forEach(patient => {
        const option = document.createElement('option');
        option.value = patient.id;
        option.textContent = patient.name;
        patientSelect.appendChild(option);
    });
}

function displayMedications(medications){
    medicationSelect.innerHTML = '';
    medications.forEach(medication => {
        const option = document.createElement('option');
        if(medication.stock > 0){
            option.value = medication.id;
            option.textContent = medication.name;        
        } else {
            option.value = 'na';
            option.textContent = medication.name + ' Out of Stock';
            option.disabled = true;
        }

        medicationSelect.appendChild(option);
    });
}

patientSearch.addEventListener('input', () => {
    const searchTerm = patientSearch.value.toLowerCase();
    const filteredPatients = patients.filter(patient => patient.name.toLowerCase().includes(searchTerm));
    displayPatients(filteredPatients);
})

medicationSearch.addEventListener('input', () =>{
    const searchTerm = medicationSearch.value.toLowerCase();
    const filteredMedications = medications.filter(medication => medication.name.toLowerCase().includes(searchTerm));
    displayMedications(filteredMedications);
})

const addMedicationToPatient = document.getElementById('addMedicationToPatient');
addMedicationToPatient.addEventListener('click', () => {
    const selectedPatientID = patientSelect.value;
    const selectedMedicationID = medicationSelect.value;
    const delivery = document.getElementById('delivery').value;    
    if(selectedMedicationID != 'na'){
        try{
            const response = fetch('http://localhost:5000/add-medication-to-patient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ patientId: selectedPatientID, medicationId: selectedMedicationID, delivery: delivery })
            });
            if(!response.ok){
                alert('Prescribed successfully')
            } else {
                alert('Could not prescribe medication')
            }
        } catch(error){
            alert('Error: ', error);
        }
    } else {
        alert('This medication is out of stock!')
    }
})
fetchPatientsAndMedications();