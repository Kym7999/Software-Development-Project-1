// Reschedule Appointment (Working)
document.getElementById('rescheduleAppointmentForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    let isOverlapping = false;
    let isDoctorAvailable = true;
    let isPatientAvailable = true;
    const patientId = sessionStorage.getItem('patientId');
    const appointmentId = document.getElementById('appointmentId').value;
    const newDate = document.getElementById('newDate').value;
    const newTime = document.getElementById('newTime').value;

    if (isTimeValid(newTime) === false) {
        alert('Appointment time should be between 9 AM and 5 PM');
        return;
    } else if (new Date(newDate) < new Date()) {
        alert('Appointment date should be today or later');
        return;
    }

    const appointmentData = {
        patientId,
        appointmentId,
        newDate,
        newTime
    };

    const response = await fetch('http://localhost:5000/patient-appointment', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const appointments = await response.json();
    const currentAppointment = appointments.find(appointment => appointment.id == appointmentId);
    if(currentAppointment == null) {
        alert('Appointment not found');
        return;
    }
    const doctorAppointments = appointments.filter(appointment => appointment.doctorid == currentAppointment.doctorid && appointment.id != appointmentId);
    const patientAppointments = appointments.filter(appointment => appointment.patientid == patientId && appointment.id != appointmentId);
    const appointmentDateTime = new Date(`${newDate} ${newTime}`);

    patientAppointments.forEach(existingAppointment => {
        const existingDateTime = new Date(`${existingAppointment.date} ${existingAppointment.time}`);
        const timeDiffInMinutes = Math.abs(appointmentDateTime - existingDateTime) / (1000 * 60);
        if (timeDiffInMinutes <= 60) {
            isPatientAvailable = false;
        }
    });
    if (isPatientAvailable === false) {        
        alert('Patient has an appointment within the hour.');
        return;
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
        alert('Doctor is not available at this time');
        return;
    }


    try {
        const response = await fetch('http://localhost:5000/rescheduleappointment', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(appointmentData)
        });

        if (response.ok) alert('Appointment rescheduled successfully');
        else alert('Error rescheduling appointment');
    } catch (error) {
        console.error('Error:', error);
    }
});

function isTimeValid(timeString) {
    // Extract hours and minutes from timeString
    const hours = parseInt(timeString.split(':')[0]);
    const minutes = parseInt(timeString.split(':')[1]);

    // Check if time is within business hours (9 AM to 5 PM)
    return (hours >= 9 && hours < 17) && (minutes >= 0 && minutes < 60);
}
