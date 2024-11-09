// NOT YET IMPLEMENTED: search button functionality - the execution of SQL query
// and display results in the "search-results" div

async function showResults() {
  const patientId = document.getElementById('patientId');
  const response = await fetch(`http://localhost:5000/get-patient-by-id?id=${patientId.value}`);
    const patient = await response.json();      

    const resultDiv = document.getElementById('results');       
    resultDiv.style.display = 'block';
    const resultItem = document.createElement('div');
    resultItem.classList.add('result-item');

    const patientInfo = document.createElement('span');
    patientInfo.textContent = `Patient Name: ${patient.name}, ID: ${patient.id}`;

    const viewDetailsButton = document.createElement('button');
    viewDetailsButton.textContent = 'View Patient Details';
    viewDetailsButton.onclick = () => {
      const encodedPatient = encodeURIComponent(JSON.stringify(patient));
      window.location.href = `patientDetails.html?patient=${encodedPatient}`;
    };

    resultItem.appendChild(patientInfo);
    resultItem.appendChild(viewDetailsButton);
    resultDiv.appendChild(resultItem);    
  }
  
  