const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const encodedPatient = urlParams.get('patient');

if (encodedPatient) {
  const patient = JSON.parse(decodeURIComponent(encodedPatient));

  const patientDetails = document.getElementById('patient-details');
  patientDetails.innerHTML = `
    <div class="details-field">
      <label for="id">ID:</label>
      <span id="id">${patient.id}</span>
    </div>
    <div class="details-field">
      <label for="name">Name:</label>
      <span id="name">${patient.name}</span>
    </div>

    <div class="details-field">
      <label for="dob">Date of Birth:</label>
      <span id="dob">${patient.dob ? patient.dob : 'N/A'}</span>
    </div>

    <div class="details-field">
      <label for="address">Address:</label>
      <span id="address">${patient.address ? patient.address : 'N/A'}</span>
    </div>

    <div class="details-field">
      <label for="phone">Phone Number:</label>
      <span id="phone">${patient.phone ? patient.phone : 'N/A'}</span>
    </div>

    <div class="details-field">
      <label for="email">Email:</label>
      <span id="email">${patient.email ? patient.email : 'N/A'}</span>
    </div>

    <div class="details-field">
      <label for="allergies">Allergies:</label>
      <span id="allergies">${patient.allergies ? patient.allergies : 'None'}</span>
    </div>
  `;
} else {  
  document.getElementById('patient-details').textContent = 'No patient data found.';
}

function getUpdatedValues(patientId) {
  const updatedValues = {
    id: patientId
  };

  const inputFields = document.querySelectorAll('.details-field input');

  for (const input of inputFields) {
    updatedValues[input.id] = input.value;
  }

  return updatedValues;
}

async function saveChanges() {
  const updatedValues = getUpdatedValues();
  const response = await fetch('http://localhost:5000/update-patient', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedValues),
  });

  const result = await response.json();
  alert(result.message);
}