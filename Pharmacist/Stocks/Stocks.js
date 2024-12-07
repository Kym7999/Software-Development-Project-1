
// Function to update stock for a medication
async function updateMedicationStock(medicationId) {
    const newStock = prompt("Enter new stock level:");    
    if (newStock < 0) {
        alert("Stock level cannot be negative.");
        return;
    }    
    const data = {
        id: medicationId.toString(),
        stock: newStock
    };
    
    const response = await fetch('http://localhost:5000/update-medication-stock', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        alert('Stock updated successfully');        
    } else {
        alert('Error updating stock');
    }
}

async function fetchMedications(){
    const response = await fetch('http://localhost:5000/get-medications');
    const medications = await response.json();      
    displayMedications(medications); 
}

function displayMedications(medications) {
    const medicationsList = document.getElementById('medicationsList');
    medicationsList.innerHTML = '';
    medications.forEach(medication => {
        const item = document.createElement('li');
        item.className = 'medication-item';
        item.dataset.id = medication.id;
        item.innerHTML = `
            <span class="med-name">${medication.name}</span>
            <span class="med-stock">${medication.stock}</span>
            <button class="update-btn">Update stock</button>
        `;        
        const updateButton = item.querySelector('.update-btn'); 
        updateButton.addEventListener('click', () => {            
            updateMedicationStock(medication.id); 
        });
        medicationsList.appendChild(item);
    });
}

fetchMedications();
