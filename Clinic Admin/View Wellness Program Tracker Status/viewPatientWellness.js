function showWellnessStatus() {
    const patientData = [
        { name: "John Doe", phone: "123-456-7890", status: "Completed" },
        { name: "Jane Smith", phone: "234-567-8901", status: "In Progress" },
        { name: "Michael Johnson", phone: "345-678-9012", status: "Not Started" },
        { name: "Emily Brown", phone: "456-789-0123", status: "Completed" },
        { name: "David Lee", phone: "567-890-1234", status: "In Progress" },
        { name: "Sarah Kim", phone: "678-901-2345", status: "Not Started" },
        { name: "Thomas Wilson", phone: "789-012-3456", status: "Completed" },
        { name: "Olivia Taylor", phone: "890-123-4567", status: "In Progress" },
        { name: "James Anderson", phone: "901-234-5678", status: "Completed" },
        { name: "Sophia Martinez", phone: "012-345-6789", status: "Not Started" },
    ];

    const selectedPatient = document.getElementById("patient").value;
    const tableBody = document.querySelector("#trackerTable tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    patientData.forEach((patient) => {
        if (!selectedPatient || selectedPatient === patient.name) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${patient.name}</td>
                <td>${patient.phone}</td>
                <td>${patient.status}</td>
            `;
            tableBody.appendChild(row);
        }
    });
}

// Populate the dropdown with patient names
document.addEventListener("DOMContentLoaded", () => {
    const patientSelect = document.getElementById("patient");
    const patientData = [
        "John Doe", "Jane Smith", "Michael Johnson", "Emily Brown",
        "David Lee", "Sarah Kim", "Thomas Wilson", "Olivia Taylor",
        "James Anderson", "Sophia Martinez"
    ];

    patientData.forEach((name) => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        patientSelect.appendChild(option);
    });
});
