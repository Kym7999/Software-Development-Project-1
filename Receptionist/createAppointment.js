const form = document.getElementById('createAppointment');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const patientId = document.getElementById('patientId').value;
    // Need to create a staff table where we can get the doctorId
    const doctorId = document.getElementById('doctorId').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    const appointmentData = {
        patientId,
        doctorId,
        date,
        time
    };
    
    try{
        const response = await fetch('http://localhost:5000/create-appointment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointmentData)
        });

        if(response.ok){
        alert('Appointment created successfully');
        } else{
        alert('Error creating appointment');
        }
    } catch(error){
        alert('Error: ', error);
    }
    form.reset();
});


