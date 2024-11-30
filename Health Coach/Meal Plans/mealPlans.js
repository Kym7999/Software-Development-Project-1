document.getElementById("createButton").addEventListener("click", function() {
    document.getElementById("createMessage").style.display = "block";
    setTimeout(() => {
        document.getElementById("createMessage").style.display = "none";
    }, 3000); // Hide after 3 seconds
});

document.getElementById("updateButton").addEventListener("click", function() {
    document.getElementById("updateMessage").style.display = "block";
    setTimeout(() => {
        document.getElementById("updateMessage").style.display = "none";
    }, 3000); // Hide after 3 seconds
});

document.getElementById("deleteButton").addEventListener("click", function() {
    document.getElementById("deleteMessage").style.display = "block";
    setTimeout(() => {
        document.getElementById("deleteMessage").style.display = "none";
    }, 3000); // Hide after 3 seconds
});
