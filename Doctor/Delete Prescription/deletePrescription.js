const prescriptionSelect = document.getElementById('prescriptionSelect');

var prescriptions;

async function fetchPrescriptions() {
    try {
        const response = await fetch('http://localhost:5000/get-prescriptions');
        prescriptions = await response.json();        
        displayPrescriptions(prescriptions);

    } catch (err) {
        console.error('Error fetching data', err);
    }
}

function displayPrescriptions(prescriptions) {    
    prescriptionSelect.innerHTML = '';
    prescriptions.forEach(prescription => {
        const option = document.createElement('option');
        option.value = prescription.id;
        option.textContent = `Patient: ${prescription.patientId} - Medication: ${prescription.medicationId}`;
        prescriptionSelect.appendChild(option);
    });
}

const deletePrescription = document.getElementById('deletePrescription');
deletePrescription.addEventListener('click', () => {
    const prescriptionId = prescriptionSelect.value;  
    if(prescriptionId != 'na'){
        try{
            const response = fetch('http://localhost:5000/delete-prescription', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: prescriptionId }) 
            });
            if(!response.ok){
                alert('Deleted Prescription Successfully')
            } else {
                alert('Error deleting prescription')
            }
        } catch(error){
            alert('Error: ', error);
        }
    } else {
        alert('Internal Server Error');
    }
})
fetchPrescriptions();