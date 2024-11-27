// Global threshold for low stock
const STOCK_THRESHOLD = 10;

// Sample list of medications (will eventually come from backend)
const medications = [
    { id: 1, name: "Lorazepam 2mg", quantity: 100, expiration: "12/23" },
    { id: 2, name: "Omeprazole 20mg", quantity: 10, expiration: "12/23" },
    { id: 3, name: "Ranitidine 150mg", quantity: 30, expiration: "12/23" },
    { id: 4, name: "Ativan 1mg", quantity: 50, expiration: "12/23" }
];

// Function to search for medications
function searchMedication() {
    const searchQuery = document.getElementById('search-input').value.trim().toLowerCase();
    
    if (!searchQuery) {
        alert("Please enter a medication name to search.");
        return;
    }

    const foundMedication = medications.find(medication => medication.name.toLowerCase().includes(searchQuery));

    if (!foundMedication) {
        alert("No matches found for your search.");
    } else {
        alert(`Found Medication: ${foundMedication.name} with ${foundMedication.quantity} in stock.`);
    }
}

// Function to update stock for a medication
async function updateMedicationStock(medicationId, newStock) {
    if (newStock < 0) {
        alert("Stock level cannot be negative.");
        return;
    }

    const response = await fetch(`http://localhost:5000/update-medication-stock?id=${medicationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: newStock })
    });

    if (response.ok) {
        alert('Stock updated successfully');
        logStockChange(medicationId, newStock); // Log the stock change
    } else {
        alert('Error updating stock');
    }
}

// Function to log stock changes for auditing purposes
async function logStockChange(medicationId, newStock) {
    const logData = {
        medicationId,
        newStock,
        timestamp: new Date().toISOString(),
        updatedBy: 'Pharmacist Name' // Placeholder for dynamic user info
    };

    await fetch('http://localhost:5000/log-stock-change', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logData)
    });
}

// Function to check stock and alert if it falls below threshold
function checkStockLevel(medicationId, stockLevel) {
    if (stockLevel < STOCK_THRESHOLD) {
        alert(`Warning: Stock of medication ID ${medicationId} is below the threshold!`);
    }
}

// Event listener for the "Update stock" buttons
document.querySelectorAll('.update-btn').forEach(button => {
    button.addEventListener('click', async (event) => {
        const medicationItem = event.target.closest('.medication-item');
        const medicationId = medicationItem.dataset.id;
        const currentStock = parseInt(medicationItem.querySelector('.med-stock').textContent);
        
        const newStock = prompt("Enter new stock level:", currentStock);
        
        if (newStock !== null) {
            const newStockNumber = parseInt(newStock);
            if (!isNaN(newStockNumber)) {
                // Update the stock and check if it's below the threshold
                await updateMedicationStock(medicationId, newStockNumber);
                checkStockLevel(medicationId, newStockNumber);
            } else {
                alert("Please enter a valid stock number.");
            }
        }
    });
});

// Function to add new medication
async function addMedication() {
    const name = document.getElementById('med-name').value;
    const type = document.getElementById('med-type').value;
    const dosage = document.getElementById('med-dosage').value;
    const stock = document.getElementById('med-stock').value;

    // Validate each field individually
    if (!name) {
        alert("Medication Name is required.");
        return;
    }

    if (!type) {
        alert("Type is required.");
        return;
    }

    if (!dosage) {
        alert("Dosage is required.");
        return;
    }

    // Validate stock: Check if it's a valid positive number
    if (!stock || isNaN(stock) || stock <= 0) {
        alert("Please enter a valid number for stock that is greater than 0.");
        return;
    }

    // If all fields are valid, prepare the medication data
    const medicationData = {
        name,
        type,
        dosage,
        stock: parseInt(stock) // Convert stock to a number
    };

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
            resetMedicationForm(); // Reset the form after success
        } else {
            alert('Error adding medication');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error: Unable to add medication.');
    }
}

// Function to reset the medication form
function resetMedicationForm() {
    document.getElementById('med-name').value = '';
    document.getElementById('med-type').value = '';
    document.getElementById('med-dosage').value = '';
    document.getElementById('med-stock').value = '';
}
