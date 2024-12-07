document.getElementById("createButton").addEventListener("click", function() {

    const patientId = document.getElementById('patientSelect').value;
    const fitnessGoals = document.getElementById('fitnessGoals').value;
    const exercises = document.getElementById('exercises').value;
    const weeklySchedule = document.getElementById('weeklySchedule').value;
    const duration = document.getElementById('duration').value;
    const notes = document.getElementById('notes').value;

    const staffId = sessionStorage.getItem('staffId');

    const exercisePlan = {
        patientId: patientId,
        staffId: staffId,
        fitnessGoals: fitnessGoals,
        exercises: exercises,
        weeklySchedule: weeklySchedule,
        duration: duration,
        notes: notes
    };

    fetch('http://localhost:5000/create-exercise-plan', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(exercisePlan),
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
    const fitnessGoals = document.getElementById('fitnessGoals').value;
    const exercises = document.getElementById('exercises').value;
    const weeklySchedule = document.getElementById('weeklySchedule').value;
    const duration = document.getElementById('duration').value;
    const notes = document.getElementById('notes').value;     

    const exercisePlan = {
        id: exerciseSelect.value,
        patientId: patientId,        
        fitnessGoals: fitnessGoals,
        exercises: exercises,
        weeklySchedule: weeklySchedule,
        duration: duration,
        notes: notes
    };

    fetch('http://localhost:5000/update-exercise-plan', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(exercisePlan),
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
    const exercisePlanId = exerciseSelect.value;    
    fetch(`http://localhost:5000/delete-exercise-plan`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: exercisePlanId }) 
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
const exerciseSelect = document.getElementById('exerciseSelect');

var patients;
var exercises;

async function fetchData() {
    try {
        const response = await fetch('http://localhost:5000/get-patients');
        patients = await response.json();        
        displayPatients(patients);

        const response2 = await fetch(`http://localhost:5000/get-exercise-plans?id=${sessionStorage.getItem('staffId')}`);
        exercises = await response2.json();
        displayExercises(exercises);

    } catch (err) {
        console.log('Error fetching data', err);
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

function displayExercises(exercises) {
    exerciseSelect.innerHTML = '<option value="" disabled selected>Select a Exercise</option>';
    exercises.forEach(exercise => {
        const option = document.createElement('option');        
        option.value = exercise.id;
        option.textContent = 'Patient ID: ' + exercise.patientId + ' | Exercise ID: ' + exercise.id;
        exerciseSelect.appendChild(option);
    });
}

function setFields(){
    const selectedExercise= exercises.find(exercise => exercise.id == exerciseSelect.value);
    document.getElementById('patientSelect').value = selectedExercise.patientId;    
    document.getElementById('fitnessGoals').value = selectedExercise.fitnessGoals;
    document.getElementById('exercises').value = selectedExercise.exercises;
    document.getElementById('weeklySchedule').value = selectedExercise.weeklySchedule;
    document.getElementById('duration').value = selectedExercise.duration;
    document.getElementById('notes').value = selectedExercise.notes;
}
