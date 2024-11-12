showPatient();
const form = document.getElementById('patientForm');
form.addEventListener('submit', async (event) => {   
    event.preventDefault();
    const option = document.getElementById('patient').value;
    const id = option.split("ID: ")[0];
    const name = document.getElementById('name').value;
    const dob = document.getElementById('dob').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const allergies = document.getElementById('allergies').value;    

    const patientData = {
        id,
        name,
        dob,
        address,
        phone,
        email,
        allergies
    }

    try{
        const response = await fetch('http://localhost:5000/update-patient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patientData)
        });    
        if(response.ok){
            alert('Patient updated successfully');
        } else {
            alert('Error updating patient');
        }
    } catch(error){
        alert('Error: ', error);
    }    
    resetForm();
});

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

// Function to delete a patient (Working)
async function deletePatient() {      
    const patientId = document.getElementById('patientId').value;
    const id = { patientId };
    try {
        const response = await fetch('http://localhost:5000/deletepatient', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(id)
        });

        if (response.ok){
            alert('Patient deleted successfully');
            patientId.value = '';
        } else alert('Error deleting patient');
    } catch (error) {
        console.error('Error:', error);
    }    
    resetForm();
}

// Function to reset the form
function resetForm() {    
    document.getElementById('name').value = '';
    document.getElementById('dob').value = '';
    document.getElementById('address').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';
    document.getElementById('allergies').value = '';    
}

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