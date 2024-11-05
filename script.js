/** 

function showInfo(role) {
    const roleDescriptions = {
        doctor: "Manage patient care, diagnose illnesses, and prescribe treatments.",
        nurse: "Assist doctors in providing care.",
        admin: "Oversee clinic operations, manage staff, book appointments.",
        receptionist: "Handle appointments, patient records, and communication.",
        patient: "View health records, schedule appointments",
        'health-coach': "Guide patients on lifestyle changes and wellness programs.",
        pharmacist: "Dispense medications, counsel patients, and manage pharmacy inventory."
    };

    document.getElementById('modal-title').innerText = role.charAt(0).toUpperCase() + role.slice(1);
    document.getElementById('modal-description').innerText = roleDescriptions[role];
    document.getElementById('info-modal').style.display = "block";
}

function closeInfo() {
    document.getElementById('info-modal').style.display = "none";
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('info-modal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

*/


// Show info about the different roles (like Nurse, Admin, Patient, etc.)
function showInfo(role) {
    const roleDescriptions = {
        doctor: "Manage patient care, diagnose illnesses, and prescribe treatments.",
        nurse: "Assist doctors and patients, administer medications, and provide care.",
        admin: "Oversee clinic operations, manage staff, and ensure compliance.",
        receptionist: "Handle appointments, patient records, and communication.",
        patient: "View health records, schedule appointments, and communicate with staff.",
        healthcoach: "Guide patients on lifestyle changes and wellness programs.",
        pharmacist: "Dispense medications, counsel patients, and manage pharmacy inventory."
    };

    document.getElementById('modal-title').innerText = role.charAt(0).toUpperCase() + role.slice(1);
    document.getElementById('modal-description').innerText = roleDescriptions[role];
    document.getElementById('info-modal').style.display = "block";
}

// Close the info modal
function closeInfo() {
    document.getElementById('info-modal').style.display = "none";
}

// Show the Sign-In form for the doctor when "I am a doctor" button is clicked
function showSignInForm() {
    const signInHtml = `
        <h3>Doctor Sign-In</h3>
        <input type="text" id="user-id" placeholder="Enter User ID" required>
        <input type="password" id="password" placeholder="Enter Password" required>
        <button onclick="signIn()">Sign In</button>
    `;
    document.getElementById('info-modal').style.display = "block";
    document.getElementById('info-modal').innerHTML = signInHtml;
}

// Simple validation for doctor login (could be extended)
// Function to show the Doctor Portal after Sign-In
// Function to show the Doctor Portal after Sign-In
// Function to show the Doctor Portal after Sign-In
// Function to display the Sign-In Modal for the Doctor
function showSignIn() {
    document.getElementById('info-modal').style.display = "block";
}

// Function to handle sign-in process (no validation, just proceed to the Doctor Portal)
function signIn() {
    // Close the Sign-In modal
    document.getElementById('info-modal').style.display = "none";
    
    // Show the Doctor Portal
    showDoctorPortal();
}

// Function to show the Doctor Portal with Patient and Medication Management widgets
function showDoctorPortal() {
    const doctorPortalHtml = `
        <h2>Welcome to the Doctor Portal</h2>
        <div class="widget" id="patient-management">
            <h3>Patient Management</h3>
            <button onclick="showPatientForm()">Enter</button>
        </div>
        <div class="widget" id="medication-management">
            <h3>Medication Management</h3>
            <button onclick="showMedicationForm()">Enter</button>
        </div>
    `;

    // Inject the Doctor Portal HTML into the modal content
    const modalContent = document.getElementById('info-modal').querySelector('.modal-content');
    modalContent.innerHTML = doctorPortalHtml;

    // Show the modal with the Doctor Portal content
    document.getElementById('info-modal').style.display = "block";
}

// Function to show the Patient Management Form with necessary fields
function showPatientForm() {
    const formHtml = `
        <h3>Add New Patient</h3>
        <input type="text" id="patient-id" placeholder="Patient ID" required>
        <input type="text" id="patient-name" placeholder="Name" required>
        <input type="date" id="patient-dob" placeholder="Date of Birth" required>
        <input type="text" id="patient-contact" placeholder="Contact Info" required>
        <input type="text" id="patient-reason" placeholder="Reason for Visit" required>
        <input type="text" id="patient-symptoms" placeholder="Symptoms" required>
        <input type="text" id="patient-allergies" placeholder="Allergies">
        <input type="text" id="patient-history" placeholder="Medical History">
        <button onclick="addPatient()">Add Patient</button>
        <button onclick="deletePatient()">Delete Patient</button>
    `;
    const modalContent = document.getElementById('info-modal').querySelector('.modal-content');
    modalContent.innerHTML = formHtml;
    document.getElementById('info-modal').style.display = "block";
}

// Function to add a new patient (temporary function for now)
function addPatient() {
    const patientID = document.getElementById('patient-id').value;
    const name = document.getElementById('patient-name').value;
    const dob = document.getElementById('patient-dob').value;
    const contactInfo = document.getElementById('patient-contact').value;
    const reason = document.getElementById('patient-reason').value;
    const symptoms = document.getElementById('patient-symptoms').value;
    const allergies = document.getElementById('patient-allergies').value;
    const history = document.getElementById('patient-history').value;

    // For now, log the patient data to the console
    console.log(`Adding Patient: ${patientID}, ${name}, ${dob}, ${contactInfo}, ${reason}, ${symptoms}, ${allergies}, ${history}`);

    // Reset the form
    resetForm();
}

// Function to delete a patient (for simplicity, just log deletion for now)
function deletePatient() {
    console.log("Deleting Patient (most recent entry for now)"); // Just a placeholder

    // Reset the form
    resetForm();
}

// Function to reset the form
function resetForm() {
    document.getElementById('patient-id').value = '';
    document.getElementById('patient-name').value = '';
    document.getElementById('patient-dob').value = '';
    document.getElementById('patient-contact').value = '';
    document.getElementById('patient-reason').value = '';
    document.getElementById('patient-symptoms').value = '';
    document.getElementById('patient-allergies').value = '';
    document.getElementById('patient-history').value = '';
}

// Function to show the Medication Management Form (same structure, not used for now)
function showMedicationForm() {
    const formHtml = `
        <h3>Add Medication</h3>
        <input type="text" id="med-name" placeholder="Medication Name" required>
        <input type="text" id="med-type" placeholder="Type" required>
        <input type="text" id="med-dosage" placeholder="Dosage" required>
        <input type="text" id="med-form" placeholder="Form (tablet/liquid/injection)" required>
        <button onclick="addMedication()">Add Medication</button>
    `;
    const modalContent = document.getElementById('info-modal').querySelector('.modal-content');
    modalContent.innerHTML = formHtml;
    document.getElementById('info-modal').style.display = "block";
}

// Function to add a medication (temporary function for now)
function addMedication() {
    const medicationName = document.getElementById('med-name').value;
    const type = document.getElementById('med-type').value;
    const dosage = document.getElementById('med-dosage').value;
    const form = document.getElementById('med-form').value;

    // For now, log the medication data to the console
    console.log(`Adding Medication: ${medicationName}, ${type}, ${dosage}, ${form}`);

    // Reset the form
    resetMedicationForm();
}

// Function to reset the medication form
function resetMedicationForm() {
    document.getElementById('med-name').value = '';
    document.getElementById('med-type').value = '';
    document.getElementById('med-dosage').value = '';
    document.getElementById('med-form').value = '';
}

// Close the modal
function closeInfo() {
    document.getElementById('info-modal').style.display = "none";
}
