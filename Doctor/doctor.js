
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
    document.getElementById('patient-id').value = '';
    document.getElementById('patient-name').value = '';
    document.getElementById('patient-dob').value = '';
    document.getElementById('patient-contact').value = '';
    document.getElementById('patient-reason').value = '';
    document.getElementById('patient-symptoms').value = '';
    document.getElementById('patient-allergies').value = '';
    document.getElementById('patient-history').value = '';
}


// Function to add a medication (Working)
async function addMedication() {
    const name = document.getElementById('med-name').value;
    const type = document.getElementById('med-type').value;
    const dosage = document.getElementById('med-dosage').value;
    const form = document.getElementById('med-form').value;
    const stock = document.getElementById('med-stock').value;
    const allowedTypes = ["tablet", "liquid", "injection"];
    if (!allowedTypes.includes(form.toLowerCase())) {
      alert("Invalid medication form");
      return;
    }

    const medicationData = {
        name,
        type,
        dosage,
        form,
        stock
    }
    
    try{
        const response = await fetch('http://localhost:5000/add-medication', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(medicationData)
        });    
        if(response.ok){
            alert('Medication added successfully');
        } else {
            alert('Error adding medication');
        }
    } catch(error){
        alert('Error: ', error);
    }

    // Reset the form
    resetMedicationForm();
}

// Function to reset the medication form
function resetMedicationForm() {
    document.getElementById('med-name').value = '';
    document.getElementById('med-type').value = '';
    document.getElementById('med-dosage').value = '';
    document.getElementById('med-form').value = '';
}

// Close the modal
function closeInfo() {
    document.getElementById('info-modal').style.display = "none";
}
