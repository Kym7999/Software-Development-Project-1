fetchData();

async function fetchData() {
    const response = await fetch('http://localhost:5000/get-prescriptions');
    prescriptions = await response.json();
    displayPrescriptions(prescriptions);
  
    const response2 = await fetch('http://localhost:5000/get-medications');
    medications = await response2.json();
    displayMedications(medications);
}
  
function displayPrescriptions(prescriptions) {
    try {
        const prescriptionList = document.getElementById('prescriptionList');

        prescriptions.forEach(prescription => {
        const listItem = document.createElement('li');
        listItem.classList.add('prescription-item');

        listItem.innerHTML = `
            <div class="prescription-name">Medication ID: ${prescription.medicationId} | Patient ID: ${prescription.patientId}</div>
            <div class="prescription-details">
            <span class="prescription-type">${prescription.status}</span>
            </div>
            <div class="prescription-stock">${prescription.delivery}</div> 
        `;

        prescriptionList.appendChild(listItem);
        });
    } catch (err) {
        alert('Error: ', err);
    }
}

function displayMedications(medications) {
    try {
      const medicationList = document.getElementById('medicationList');
  
      medications.forEach(medication => {
        const listItem = document.createElement('li');
        listItem.classList.add('prescription-item');
  
        listItem.innerHTML = `
          <div class="prescription-name">ID: ${medication.id} | ${medication.name}</div>
          <div class="prescription-details">
            <span class="prescription-type">${medication.type}</span>
            <span class="prescription-dosage">${medication.dosage}</span>
            <span class="prescription-form">${medication.form}</span>
          </div>
          <div class="prescription-stock">${medication.stock > 0 ? 'In Stock: ' + medication.stock : 'Out of Stock'}</div> 
        `;
  
        medicationList.appendChild(listItem);
      });
    } catch (err) {
      alert('Error: ', err);
    }
  }