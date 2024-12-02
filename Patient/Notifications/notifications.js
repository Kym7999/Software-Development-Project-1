document.addEventListener('DOMContentLoaded', async () => {
    const notificationContainer = document.getElementById('notificationContainer');
  
    try {
      const response = await fetch('http://localhost:5000/api/notifications');
      const notifications = await response.json();
  
      if (notifications.length === 0) {
        notificationContainer.innerHTML = '<p>No notifications available.</p>';
        return;
      }
  
      notifications.forEach(notification => {
        const notificationElement = document.createElement('div');
        notificationElement.classList.add('notification');
  
        notificationElement.innerHTML = `
          <div class="notification-title">${notification.title}</div>
          <div class="notification-body">${notification.body}</div>
          <div class="notification-time">${new Date(notification.timestamp).toLocaleString()}</div>
        `;
  
        notificationContainer.appendChild(notificationElement);
      });
    } catch (error) {
      notificationContainer.innerHTML = '<p>Error loading notifications.</p>';
      console.error('Error fetching notifications:', error);
    }
  });
  
