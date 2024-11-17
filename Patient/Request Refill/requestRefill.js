var medications;
const requestRefillForm = document.getElementById('requestRefillForm');
const medicationSearch = document.getElementById('medicationSearch');
medicationSearch.addEventListener('input', () =>{
    const searchTerm = medicationSearch.value.toLowerCase();
    const filteredMedications = medications.filter(medication => medication.name.toLowerCase().includes(searchTerm));
    displayMedications(filteredMedications);
})

requestRefillForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const patientId = sessionStorage.getItem('patientId');
    const medicationId = document.getElementById('medicationSelect').value;
    const quantity = document.getElementById('quantity').value;
    const refillData = {
        patientId,
        medicationId,
        quantity
    };
    try {
        const response = await fetch('http://localhost:5000/request-refill', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(refillData)
        });
        if (response.ok) alert('Refill requested successfully');
        else alert('You already have a refill request for this medication');
    } catch (error) {
        console.error('Error:', error);
    }
});

fetchMedications();
async function fetchMedications() {
    try {
        const response = await fetch('http://localhost:5000/get-medications');
        medications = await response.json();      
        displayMedications(medications);  
    } catch (err) {
        console.error('Error fetching data', err);
    }
}
function displayMedications(medications){
    const medicationSelect = document.getElementById('medicationSelect');
    medicationSelect.innerHTML = '';
    medications.forEach(medication => {
        const option = document.createElement('option');
        if(medication.stock > 0){
            option.value = medication.id;
            option.textContent = medication.name;        
        } else {
            option.value = 'na';
            option.textContent = medication.name + ' Out of Stock';
            option.disabled = true;
        }
        medicationSelect.appendChild(option);
    });
}