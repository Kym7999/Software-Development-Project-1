// Function to handle Approve action
function ApproveRefill() {
    // Show an alert confirming approval and notification message
    alert("The medication refill request was approved—and a notification was sent to the patient.");
}

// Function to handle Deny action
function DenyRefill() {
    // Show an alert confirming denial and notification message
    alert("The refill request has been denied-and a notification was sent to the patient");
}

// Should be removed
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