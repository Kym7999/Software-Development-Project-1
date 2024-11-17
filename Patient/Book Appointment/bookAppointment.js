// Working
const form = document.getElementById('createAppointment');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    let isOverlapping = false;
    let isDoctorAvailable = true;
    let isPatientAvailable = true;
    const patientId = sessionStorage.getItem('patientId');
    const doctorId = document.getElementById('doctorSelect').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    const appointmentData = {
        patientId,
        doctorId,
        date,
        time
    };

    if (isTimeValid(time) === false) {
        isOverlapping = true;
        alert('Appointment time should be between 9 AM and 5 PM');
    } else if (new Date(date) < new Date()) {
        isOverlapping = true;
        alert('Appointment date should be today or later');
    }

    // Check if patient has an appointment at the same time
    try {
        const response = await fetch('http://localhost:5000/patient-appointment', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const appointments = await response.json();
        const doctorAppointments = appointments.filter(appointment => appointment.doctorid == doctorId);
        const patientAppointments = appointments.filter(appointment => appointment.patientid == patientId);
        const appointmentDateTime = new Date(`${date} ${time}`);

        patientAppointments.forEach(existingAppointment => {
            const existingDateTime = new Date(`${existingAppointment.date} ${existingAppointment.time}`);
            const timeDiffInMinutes = Math.abs(appointmentDateTime - existingDateTime) / (1000 * 60);
            if (timeDiffInMinutes <= 60) {
                isPatientAvailable = false;
            }
        });
        if (isPatientAvailable === false) {
            isOverlapping = true;
            alert('You already have an appointment within the hour.');
        }
        doctorAppointments.forEach(existingAppointment => {
            const existingDateTime = new Date(`${existingAppointment.date} ${existingAppointment.time}`);
            const timeDiffInMinutes = Math.abs(appointmentDateTime - existingDateTime) / (1000 * 60);            
            if (timeDiffInMinutes <= 60) {
                isOverlapping = true;
                isDoctorAvailable = false;
            }
        });
        if (isDoctorAvailable === false) {
            isOverlapping = true;
            alert('Doctor is not available at this time');
        }

        if (isOverlapping === false) {
            const response = await fetch('http://localhost:5000/create-appointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(appointmentData)
            });

            if (response.ok) {
                alert('Appointment created successfully');
                form.reset();
            } else {
                alert('Error creating appointment');
            }
        }
    } catch (error) {
        alert('Error: ', error);
    }
});

function isTimeValid(timeString) {
    // Extract hours and minutes from timeString
    const hours = parseInt(timeString.split(':')[0]);
    const minutes = parseInt(timeString.split(':')[1]);

    // Check if time is within business hours (9 AM to 5 PM)
    return (hours >= 9 && hours < 17) && (minutes >= 0 && minutes < 60);
}

loadDoctors();
async function loadDoctors() {
    try {
        const response = await fetch('http://localhost:5000/doctor-id-name');
        const doctors = await response.json();

        const options = doctors.map(doctor => {
            return {
                value: doctor.id,
                text: `${doctor.name}, ID: ${doctor.id}`
            };
        });

        const doctorSelect = document.getElementById('doctorSelect');
        options.forEach(option => {
            const newOption = document.createElement('option');
            newOption.value = option.value;
            newOption.text = option.text;
            doctorSelect.appendChild(newOption);
        });

    } catch (error) {
        console.error('Error:', error);
    }
}
