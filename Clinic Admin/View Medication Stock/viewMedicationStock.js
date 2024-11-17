fetchMedication();

async function fetchMedication() {
    const response = await fetch('http://localhost:5000/get-medications');
    medications = await response.json();        
    displayMedications(medications);

    const response2 = await fetch('http://localhost:5000/get-refill-requests');
    refillRequests = await response2.json();
    displayRefillRequests(refillRequests);
}

function displayMedications(medications) {
    try {
      const medicationList = document.getElementById('medicationList');
  
      medications.forEach(medication => {
        const listItem = document.createElement('li');
        listItem.classList.add('medication-item');
          
        listItem.innerHTML = `
          <div class="medication-name">ID: ${medication.id} | ${medication.name}</div>
          <div class="medication-details">
            <span class="medication-type">${medication.type}</span>
            <span class="medication-dosage">${medication.dosage}</span>
            <span class="medication-form">${medication.form}</span>
          </div>
          <div class="medication-stock">In Stock: ${medication.stock}</div>
        `;
  
        medicationList.appendChild(listItem);
      });
    } catch (err) {
      alert('Error: ', err);
    }
}
function displayRefillRequests(refillRequests) {
    try {
      const refillRequestList = document.getElementById('refillRequests');
  
      refillRequests.forEach(refillRequest => {
        const listItem = document.createElement('li');
        listItem.classList.add('refill-request-item');
          
        listItem.innerHTML = `
          <div class="refill-id">ID: ${refillRequest.id}</div>
          <div class="refill-details">
            <div class="refill-medication-id">Medication ID: ${refillRequest.medication_id}</div>
            <div class="refill-patient-id">Patient ID: ${refillRequest.patient_id}</div>
          </div>
        `;
        
        refillRequestList.appendChild(listItem);
      });
    } catch (err) {
      alert('Error in stock: ', err);
    }
}