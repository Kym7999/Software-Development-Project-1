
// Function to add a medication (Working)
async function addMedication() {
    const name = document.getElementById('med-name').value;
    const type = document.getElementById('med-type').value;
    const dosage = document.getElementById('med-dosage').value;
    const form = document.getElementById('med-form').value;
    const stock = document.getElementById('med-stock').value;
    const allowedTypes = ["tablet", "liquid", "injection"];
    if (!allowedTypes.includes(form.toLowerCase())) {
        alert("Invalid medication form");
        return;
    }

    const medicationData = {
        name,
        type,
        dosage,
        form,
        stock
    }

    try {
        const response = await fetch('http://localhost:5000/add-medication', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(medicationData)
        });
        if (response.ok) {
            alert('Medication added successfully');
        } else {
            alert('Error adding medication');
        }
    } catch (error) {
        alert('Error: ', error);
    }

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

function deleteMedication() {
    const medName = document.getElementById('med-name').value; // Get the value!
    try {
        fetch('http://localhost:5000/delete-medication', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: medName })
        });
        
        alert('Medication deleted successfully');
    } catch (error) {
        alert('Error: ', error);
    }
}