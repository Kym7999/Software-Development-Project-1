const form = document.getElementById('patientForm');
form.addEventListener('submit', async (event) => {   
    event.preventDefault();

    const name = document.getElementById('name').value;
    const dob = document.getElementById('dob').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const allergies = document.getElementById('allergies').value;    

    const patientData = {
        name,
        dob,
        address,
        phone,
        email,
        allergies
    }

    try{
        const response = await fetch('http://localhost:5000/add-patient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patientData)
        });    
        if(response.ok){
            alert('Patient added successfully');
        } else {
            alert('Error adding patient');
        }
    } catch(error){
        alert('Error: ', error);
    }    
    resetForm();
});

// Function to delete a patient (for simplicity, just log deletion for now)
function deletePatient() {
    console.log("Deleting Patient (most recent entry for now)"); // Just a placeholder

    // Reset the form
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


// Function to add a medication (temporary function for now)
function addMedication() {
    const medicationName = document.getElementById('med-name').value;
    const type = document.getElementById('med-type').value;
    const dosage = document.getElementById('med-dosage').value;
    const form = document.getElementById('med-form').value;

    // For now, log the medication data to the console
    console.log(`Adding Medication: ${medicationName}, ${type}, ${dosage}, ${form}`);

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
