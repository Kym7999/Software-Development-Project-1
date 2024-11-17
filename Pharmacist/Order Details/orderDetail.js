showPatient();
async function showPatient() {
    const urlParams = new URLSearchParams(window.location.search);
    const patientId = urlParams.get('patientId');
  
    const response = await fetch(`http://localhost:5000/get-patient-by-id?id=${patientId}`);
  
    if (!response.ok) {
      throw new Error(`Failed to fetch patient: ${response.statusText}`);
    }
  
    const patient = await response.json();
    document.getElementById('patient-id').textContent = patient.id;
    document.getElementById('patient-name').textContent = patient.name;
    document.getElementById('patient-dob').textContent = patient.dob;
    document.getElementById('patient-allergies').textContent = patient.allergies;
}
  
showMedication();
async function showMedication() {
const urlParams = new URLSearchParams(window.location.search);
const medicationId = urlParams.get('medicationId');

const response = await fetch(`http://localhost:5000/get-medications-by-id?id=${medicationId}`);

if (!response.ok) {
    throw new Error(`Failed to fetch medication: ${response.statusText}`);
}

const medication = await response.json();
document.getElementById('medication-id').textContent = medication[0].id;
document.getElementById('medication-name').textContent = medication[0].name;
document.getElementById('medication-type').textContent = medication[0].type;
document.getElementById('medication-dosage').textContent = medication[0].dosage;
document.getElementById('medication-form').textContent = medication[0].form;
document.getElementById('medication-stock').textContent = medication[0].stock;
}

async function updateOrder(status){
    const urlParams = new URLSearchParams(window.location.search);
    const patientId = urlParams.get('patientId');
    const medicationId = urlParams.get('medicationId');    
    
    const updateData = {
        patientId,
        medicationId,
        status
    }

    try {
        const response = await fetch('http://localhost:5000/update-prescription-status', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateData)
        });
  
        if (response.ok){
            alert('Prescription status updated successfully');
            window.location.href = '../New Order/newOrder.html';
        } 
        else alert('Error updating prescription');
    } catch (error) {
        console.error('Error:', error);
    }
}

