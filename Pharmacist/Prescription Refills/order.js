const orderCardsContainer = document.getElementById('order-cards-container');
getOrders();
async function getOrders(){
  
  try{
    const response = await fetch('http://localhost:5000/get-refill-requests-incomplete', {
      method: 'GET',
      headers: { 'Content-Type' : 'application/json' }      
    });

    const orders = await response.json();
    orders.forEach(order => {
      const card = createOrderCard(order);
      orderCardsContainer.appendChild(card);
    });
  } catch (error) {
    console.error('Error: ', error);
  }
}

function createOrderCard(order){
  const card = document.createElement('div');
  card.classList.add('order-card');
  const info = document.createElement('div');
  info.classList.add('order-info');
  info.innerHTML = `
    <p class="order-name">Patient ID: ${order.patient_id}</p>
    <p class="order-details">Medication ID: ${order.medication_id}</p>    
    <p class="order-details">Quantity: ${order.quantity}</p>
  `;
  const button = document.createElement('button');
  button.classList.add('view-details-btn');
  button.textContent = 'View Details';
  button.onclick = () => {
    window.location.href = `requestDetail.html?patientId=${order.patient_id}&medicationId=${order.medication_id}`;
  };

  card.appendChild(info);
  card.appendChild(button);

  return card;
}

// Cancel- Reject Order 
document.addEventListener('DOMContentLoaded', () => {
  // Get the Order ID from the order details container
  const orderDetails = document.getElementById('orderDetails');
  const orderId = orderDetails ? orderDetails.getAttribute('data-order-id') : null;

  // Check if Order ID exists
  if (!orderId) {
    console.error('Order ID not found!');
    return;
  }
  

  // Handle Confirm Order button click
  document.querySelector('.confirm-btn')?.addEventListener('click', async (event) => {
    event.preventDefault();  // Prevent the default button behavior

    const id = { OrderId: orderId };

    try {
      const response = await fetch('http://localhost:5000/confirmOrder', {
        method: 'POST',  // Assuming confirm order is a POST request
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(id)
      });

      if (response.ok) {
        alert('Order Confirmed successfully');
      } else {
        alert('Error confirming order');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to confirm the order');
    }
  });

  // Handle Reject Order button click
  document.querySelector('.reject-btn')?.addEventListener('click', async (event) => {
    event.preventDefault();  // Prevent the default button behavior

    const id = { OrderId: orderId };

    try {
      const response = await fetch('http://localhost:5000/rejectOrder', {
        method: 'DELETE',  // Assuming reject order is a DELETE request
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(id)
      });

      if (response.ok) {
        alert('Rejected Order successfully');
      } else {
        alert('Error rejecting order');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to reject the order');
    }
  });
});