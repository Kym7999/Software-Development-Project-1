async function fetchMedication() {
    const response = await fetch('http://localhost:5000/get-medications');
    medications = await response.json();        
    displayMedications(medications);
}

function displayMedications(medications) {    
    try{
        const medicationList = document.getElementById('medicationList');
        medications.forEach(medication => {    
            const listItem = document.createElement('li');
            if(medication.stock > 0){
                listItem.textContent = `${medication.name} | ${medication.stock} in stock`;
            } else {
                listItem.textContent = `${medication.name} | Out of Stock`;
            }
            medicationList.appendChild(listItem);        
        });
    } catch (err){
       alert('Error: ', err);
    }
}

fetchMedication();