// Function to get the query parameter from URL
function getPatientID() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

// Function to display patient details (replace with actual data retrieval logic)
function displayPatientDetails() {
  const patientID = getPatientID();

  if (patientID) {
    // For demonstration purposes, setting the patient ID in the document
    document.getElementById('name').innerText = `Patient Name for ID: ${patientID}`;
    
    // Placeholder for other patient data - replace with actual data fetching logic
    document.getElementById('dob').innerText = "January 1, 1980";
    document.getElementById('address').innerText = "123 Main St, Toronto, ON";
    document.getElementById('phone').innerText = "+1 (123) 456-7890";
    document.getElementById('email').innerText = "johndoe@example.com";
    document.getElementById('allergies').innerText = "Peanuts, Shellfish";
  } else {
    document.getElementById('name').innerText = "No patient found.";
  }
}

// Implement functions to perform SQL queries to update the records for editable fields
// I just made allergies editable for now, feel free to adjust

// Run the displayPatientDetails function when the page loads
window.onload = displayPatientDetails;
