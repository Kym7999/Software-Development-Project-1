document.getElementById("createButton").addEventListener("click", function() {

    const patientId = document.getElementById('patientSelect').value;
    const targetCalories = document.getElementById('targetCalories').value;
    const nutrientGoals = document.getElementById('nutrientGoals').value;
    const foodsAvoid = document.getElementById('foodsToAvoid').value;
    const hydrationGoals = document.getElementById('hydrationGoals').value;
    const notes = document.getElementById('notes').value;

    const staffId = sessionStorage.getItem('staffId');

    const mealPlan = {
        patientId: patientId,
        staffId: staffId,
        targetCalories: targetCalories,
        nutrientGoals: nutrientGoals,
        foodsAvoid: foodsAvoid,
        hydrationGoals: hydrationGoals,
        notes: notes
    };

    fetch('http://localhost:5000/create-meal-plan', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mealPlan),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        document.getElementById("createMessage").style.display = "block";
        setTimeout(() => {
            document.getElementById("createMessage").style.display = "none";
        }, 3000); // Hide after 3 seconds
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

document.getElementById("updateButton").addEventListener("click", function() {

    const patientId = document.getElementById('patientSelect').value;
    const targetCalories = document.getElementById('targetCalories').value;
    const nutrientGoals = document.getElementById('nutrientGoals').value;
    const foodsAvoid = document.getElementById('foodsToAvoid').value;
    const hydrationGoals = document.getElementById('hydrationGoals').value;
    const notes = document.getElementById('notes').value;

    const mealPlanId = mealPlanSelect.value;

    const mealPlan = {
        id: mealPlanId,
        patientId: patientId,
        targetCalories: targetCalories,
        nutrientGoals: nutrientGoals,
        foodsAvoid: foodsAvoid,
        hydrationGoals: hydrationGoals,
        notes: notes
    };

    fetch('http://localhost:5000/update-meal-plan', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mealPlan),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        document.getElementById("updateMessage").style.display = "block";
        setTimeout(() => {
            document.getElementById("updateMessage").style.display = "none";
        }, 3000); // Hide after 3 seconds
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

document.getElementById("deleteButton").addEventListener("click", function() {
    const mealPlanId = mealPlanSelect.value;    
    fetch(`http://localhost:5000/delete-meal-plan`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: mealPlanId }) 
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        document.getElementById("deleteMessage").style.display = "block";
        setTimeout(() => {
            document.getElementById("deleteMessage").style.display = "none";
        }, 3000); // Hide after 3 seconds
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

fetchData();

const patientSelect = document.getElementById('patientSelect');
const mealPlanSelect = document.getElementById('mealPlanSelect');

var patients;
var mealPlans;

async function fetchData() {
    try {
        const response = await fetch('http://localhost:5000/get-patients');
        patients = await response.json();        
        displayPatients(patients);

        const response2 = await fetch(`http://localhost:5000/get-meal-plans?id=${sessionStorage.getItem('staffId')}`);
        mealPlans = await response2.json();
        displayMealPlans(mealPlans);

    } catch (err) {
        console.error('Error fetching data', err);
    }
}

function displayPatients(patients) {    
    patientSelect.innerHTML = '';
    patients.forEach(patient => {
        const option = document.createElement('option');
        option.value = patient.id;
        option.textContent = patient.name;
        patientSelect.appendChild(option);
    });
}

function displayMealPlans(mealPlans) {
    mealPlanSelect.innerHTML = '<option value="" disabled selected>Select a patient</option>';
    mealPlans.forEach(mealPlan => {
        const option = document.createElement('option');        
        option.value = mealPlan.id;
        option.textContent = 'Patient ID: ' + mealPlan.patientId + ' | Meal Plan ID: ' + mealPlan.id;
        mealPlanSelect.appendChild(option);
    });
}

function setFields(){
    const selectedMealPlan = mealPlans.find(mealPlan => mealPlan.id == mealPlanSelect.value);
    document.getElementById('patientSelect').value = selectedMealPlan.patientId;    
    document.getElementById('targetCalories').value = selectedMealPlan.targetCalories;
    document.getElementById('nutrientGoals').value = selectedMealPlan.nutrientGoals;
    document.getElementById('foodsToAvoid').value = selectedMealPlan.foodsAvoid;
    document.getElementById('hydrationGoals').value = selectedMealPlan.hydrationGoals;
    document.getElementById('notes').value = selectedMealPlan.notes;
}


