// Function to get the query parameter from URL
function getPatientID() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
  }
  
  // Example function to display patient ID (replace with actual data retrieval logic)
  function displayPatientDetails() {
    const patientID = getPatientID();
  
    if (patientID) {
      // For demonstration purposes, let's set the patient ID in the document
      document.getElementById('name').innerText = `Patient Name for ID: ${patientID}`;
      
      // Here, you would fetch actual patient data based on patientID
      // For example, use patientID to query your database or a JSON object
    } else {
      document.getElementById('name').innerText = "No patient found.";
    }
  }
  
  window.onload = displayPatientDetails;
  