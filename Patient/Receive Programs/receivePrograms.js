document.addEventListener('DOMContentLoaded', async () => {    
    const mealplanContainer = document.getElementById('mealplanContainer');
    const exerciseContainer = document.getElementById('exerciseContainer');

    try {            
        const patientId = sessionStorage.getItem('patientId');
        const response = await fetch(`http://localhost:5000/get-mealplan-by-id?id=${patientId}`);
        const mealplans = await response.json();        

        const response2 = await fetch(`http://localhost:5000/get-exercise-by-id?id=${patientId}`);
        const exercises = await response2.json();
        
        // For Meal Plans
        if (mealplans.length === 0) {
            mealplanContainer.innerHTML = '<p>You have no Meal Plans</p>';
        } else {
            mealplanContainer.innerHTML = '';
            mealplanContainer.innerHTML += '<h2>Meal Plans:</h2>';
            mealplans.forEach(mealplan => {
                const mealplanCard = `
                    <div class="program-card">
                        <h2>Staff ID: ${mealplan.staffId}</h2>
                        <p><strong>Target Calories:</strong> ${mealplan.targetCalories}</p>
                        <p><strong>Nutrient Goals:</strong> ${mealplan.nutrientGoals}</p>
                        <p><strong>Foods to Avoid:</strong> ${mealplan.foodsAvoid}</p>
                        <p><strong>Hydration Goals (liters):</strong> ${mealplan.hydrationGoals}</p>
                        <p><strong>Notes:</strong> ${mealplan.notes}</p>
                    </div>
                `;
                mealplanContainer.innerHTML += mealplanCard;
            });
        }

        // For Exercises
        if (exercises.length === 0) {
            exerciseContainer.innerHTML = '<p>You have no Exercises</p>';
        } else {
            exerciseContainer.innerHTML = '';
            exerciseContainer.innerHTML += '<h2>Exercises:</h2>';
            exercises.forEach(exercise => {
                const exerciseCard = `
                    <div class="program-card">
                        <h2>Staff ID: ${exercise.staffId}</h2>
                        <p><strong>Fitness Goals:</strong> ${exercise.fitnessGoals}</p>                    
                        <p><strong>Exercises:</strong> ${exercise.exercises}</p>
                        <p><strong>Weekly Schedule:</strong> ${exercise.weeklySchedule}</p>
                        <p><strong>Duration (minutes):</strong> ${exercise.duration}</p>
                        <p><strong>Notes:</strong> ${exercise.notes}</p>
                    </div>
                `;
                exerciseContainer.innerHTML += exerciseCard;
            });
        }

    } catch (error) {        
        mealplanContainer.innerHTML = '<p>Error loading programs. Please try again later.</p>';
    }
});


