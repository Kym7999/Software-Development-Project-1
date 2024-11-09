// Book Appointment (Working)
document.getElementById('bookAppointmentForm')?.addEventListener('submit', async (event) => {

    event.preventDefault();
    const patientId = document.getElementById('patientId').value;  
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
});

// Reschedule Appointment (Working)
document.getElementById('rescheduleAppointmentForm')?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const appointmentId = document.getElementById('appointmentId').value;
  const newDate = document.getElementById('newDate').value;
  const newTime = document.getElementById('newTime').value;

  const appointmentData = {
        appointmentId,
        newDate,
        newTime
    };

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

// Cancel Appointment (Working)
document.getElementById('cancelAppointmentForm')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const appointmentId = document.getElementById('appointmentId').value;

    const id = { appointmentId };

  try {
      const response = await fetch('http://localhost:5000/appointmentscancel', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(id)
    });

      if (response.ok) alert('Appointment canceled successfully');
      else alert('Error canceling appointment');
  } catch (error) {
      console.error('Error:', error);
  }
});

// Request Refill (Working, but will need some changes)
document.getElementById('requestRefillForm')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const medicationName = document.getElementById('medicationName').value;

  try {
      const response = await fetch('http://localhost:5000/refills', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ medicationName: medicationName })
      });

      if (response.ok) alert('Refill requested successfully');
      else alert('Error requesting refill');
  } catch (error) {
      console.error('Error:', error);
  }
});
