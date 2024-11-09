const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const encodedPatient = urlParams.get('patient');

if (encodedPatient) {
  const patient = JSON.parse(decodeURIComponent(encodedPatient));

  const patientDetails = document.getElementById('patient-details');
  patientDetails.innerHTML = `
    <div class="details-field">
      <label for="id">ID:</label>
      <input type="text" id="id" value="${patient.id}" readonly>
    </div>
    <div class="details-field">
      <label for="name">Name:</label>
      <input type="text" id="name" value="${patient.name}">
    </div>

    <div class="details-field">
      <label for="dob">Date of Birth:</label>
      <input type="text" id="dob" value="${patient.dob ? patient.dob : 'N/A'}">
    </div>

    <div class="details-field">
      <label for="address">Address:</label>
      <input type="text" id="address" value="${patient.address ? patient.address : 'N/A'}">
    </div>

    <div class="details-field">
      <label for="phone">Phone Number:</label>
      <input type="text" id="phone" value="${patient.phone ? patient.phone : 'N/A'}">
    </div>

    <div class="details-field">
      <label for="email">Email:</label>
      <input type="text" id="email" value="${patient.email ? patient.email : 'N/A'}">
    </div>

    <div class="details-field">
      <label for="allergies">Allergies:</label>
      <input type="text" id="allergies" value="${patient.allergies ? patient.allergies : 'None'}">
    </div>
    <button class="save-changes" onclick="saveChanges()">Save Changes</button>
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