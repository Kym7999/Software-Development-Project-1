// Cancel Appointment (Working)
document.getElementById('cancelAppointmentForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const patientId = sessionStorage.getItem('patientId');
    const appointmentId = document.getElementById('appointmentId').value;

    const id = { appointmentId, patientId };

    try {
        const response = await fetch('http://localhost:5000/appointmentscancel', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(id)
        });

        if (response.ok) alert('Appointment canceled successfully');
        else alert('Appointment ID is not correct');
    } catch (error) {
        console.error('Error:', error);
    }
});
