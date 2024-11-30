fetchMedication();

async function fetchMedication() {
  const response = await fetch('http://localhost:5000/get-medications');
  medications = await response.json();
  displayMedications(medications);
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
        <div class="medication-stock">${medication.stock > 0 ? 'In Stock: ' + medication.stock : 'Out of Stock'}</div> 
      `;

      medicationList.appendChild(listItem);
    });
  } catch (err) {
    alert('Error: ', err);
  }
}