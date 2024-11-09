// Book Appointment
document.getElementById('bookAppointmentForm')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const doctor = document.getElementById('doctor').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  const appointmentData = { patient_id: 1, doctor, appointment_datetime: `${date}T${time}` };

  try {
      const response = await fetch('http://localhost:3000/appointments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(appointmentData)
      });

      if (response.ok) alert('Appointment booked successfully');
      else alert('Error booking appointment');
  } catch (error) {
      console.error('Error:', error);
  }
});

// Reschedule Appointment
document.getElementById('rescheduleAppointmentForm')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const appointmentId = document.getElementById('appointmentId').value;
  const newDate = document.getElementById('newDate').value;
  const newTime = document.getElementById('newTime').value;

  try {
      const response = await fetch(`http://localhost:3000/appointments/${appointmentId}/reschedule`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ new_date: `${newDate}T${newTime}` })
      });

      if (response.ok) alert('Appointment rescheduled successfully');
      else alert('Error rescheduling appointment');
  } catch (error) {
      console.error('Error:', error);
  }
});

// Cancel Appointment
document.getElementById('cancelAppointmentForm')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const appointmentId = document.getElementById('appointmentId').value;

  try {
      const response = await fetch(`http://localhost:3000/appointments/${appointmentId}`, { method: 'DELETE' });

      if (response.ok) alert('Appointment canceled successfully');
      else alert('Error canceling appointment');
  } catch (error) {
      console.error('Error:', error);
  }
});

// Request Refill
document.getElementById('requestRefillForm')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const medicationName = document.getElementById('medicationName').value;

  try {
      const response = await fetch('http://localhost:3000/refills', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ patient_id: 1, medication_name: medicationName })
      });

      if (response.ok) alert('Refill requested successfully');
      else alert('Error requesting refill');
  } catch (error) {
      console.error('Error:', error);
  }
});
