document.addEventListener('DOMContentLoaded', async () => {
    const notificationContainer = document.getElementById('notificationContainer');
    const prescriptionContainer = document.getElementById('prescriptionContainer');
  
    try {
      const patientId = sessionStorage.getItem('patientId');
      const response = await fetch(`http://localhost:5000/get-appointments-by-id?id=${patientId}`);
      const appointments = await response.json();
      
      if (appointments.length === 0) {
        notificationContainer.innerHTML = '<p>No upcoming appointments</p>';
        return;
      } else {
        notificationContainer.innerHTML = '<h3>Upcoming appointments:</h3>';
      }
      
      appointments.forEach(appointments => {
        const notificationElement = document.createElement('div');
        notificationElement.classList.add('notification');        
        notificationElement.innerHTML = `
          <div class="notification-title">${appointments.doctorid}</div>
          <div class="notification-body">${appointments.date}</div>
          <div class="notification-time">${appointments.time}</div>
        `;  
        notificationContainer.appendChild(notificationElement);
      });

      const response2 = await fetch(`http://localhost:5000/get-prescriptions-by-id?id=${patientId}`);
      const prescriptions = await response2.json();

      if (prescriptions.length === 0) {
        prescriptionContainer.innerHTML = '<p>No prescriptions</p>';
        return;
      } else {
        prescriptionContainer.innerHTML = '<h3>Prescriptions:</h3>';
      }

      prescriptions.forEach(prescriptions => {
        const prescriptionElement = document.createElement('div');
        prescriptionElement.classList.add('notification');        
        prescriptionElement.innerHTML = `
          <div class="notification-title">${prescriptions.medicationId}</div>
          <div class="notification-body">${prescriptions.status}</div>
          <div class="notification-time">${prescriptions.delivery}</div>
        `;  
        prescriptionContainer.appendChild(prescriptionElement);
      });

    } catch (error) {
      notificationContainer.innerHTML = '<p>Error loading notifications.</p>';      
    }
  });
  
