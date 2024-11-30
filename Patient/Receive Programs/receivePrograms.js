document.addEventListener('DOMContentLoaded', () => {
    const loadProgramsButton = document.getElementById('loadProgramsButton');
    const programsContainer = document.getElementById('programsContainer');

    loadProgramsButton.addEventListener('click', async () => {
        loadProgramsButton.disabled = true; // Disable button to prevent multiple clicks
        loadProgramsButton.textContent = 'Loading...';

        try {
            // Simulated fetch: replace with actual API endpoint when available
            const programs = await fetchMockPrograms();

            if (programs.length === 0) {
                programsContainer.innerHTML = '<p>No prescribed wellness programs available.</p>';
            } else {
                programsContainer.innerHTML = ''; // Clear container before adding new content
                programs.forEach(program => {
                    const programCard = `
                        <div class="program-card">
                            <h2>${program.name}</h2>
                            <p><strong>Goals:</strong> ${program.goals}</p>
                            <p><strong>Steps:</strong> ${program.steps}</p>
                            <p><strong>Duration:</strong> ${program.duration}</p>
                        </div>
                    `;
                    programsContainer.innerHTML += programCard;
                });
            }
        } catch (error) {
            console.error('Error fetching programs:', error);
            programsContainer.innerHTML = '<p>Error loading programs. Please try again later.</p>';
        } finally {
            loadProgramsButton.textContent = 'Load Programs';
            loadProgramsButton.disabled = false;
        }
    });
});

// Simulated mock API response
async function fetchMockPrograms() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    name: "Cardio Health Plan",
                    goals: "Improve heart health through regular exercise.",
                    steps: "Daily walks, weekly cardio sessions, monitor heart rate.",
                    duration: "3 months"
                },
                {
                    name: "Weight Management Program",
                    goals: "Achieve healthy weight loss with proper diet.",
                    steps: "Follow a meal plan, exercise regularly, track progress.",
                    duration: "6 months"
                }
            ]);
        }, 1000);
    });
}

