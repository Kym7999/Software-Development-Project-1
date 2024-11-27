// Function to display a message temporarily
function showMessage(elementId, message, duration = 3000) {
    const messageElement = document.getElementById(elementId);
    messageElement.textContent = message; // Set the message
    messageElement.style.display = "block"; // Show the message

    // Hide the message after the specified duration
    setTimeout(() => {
        messageElement.style.display = "none";
    }, duration);
}

// Handle Create Exercise Plan button click
document.getElementById("createButton").addEventListener("click", function () {
    showMessage("createMessage", "Exercise Plan successfully created.");
});

// Handle Update Exercise Plan button click
document.getElementById("updateButton").addEventListener("click", function () {
    showMessage("updateMessage", "Exercise Plan successfully updated.");
});

// Handle Delete Exercise Plan button click
document.getElementById("deleteButton").addEventListener("click", function () {
    showMessage("deleteMessage", "Exercise Plan successfully deleted.");
});
