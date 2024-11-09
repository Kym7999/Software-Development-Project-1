const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const data = {
        email,
        password
    };
    
    try{
        const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        });            

        const role = await response.json();                    
        if(role.role === 'clinicAdmin'){
            window.location.href = 'Clinic Admin/clinicAdminHome.html';
        } else if (role.role === 'receptionist'){
            window.location.href = 'Receptionist/receptionistHome.html';
        } else if (role.role === 'patient'){
            window.location.href = 'Patient/patientHome.html';
        } else if (role.role === 'doctor'){
            window.location.href = 'Doctor/doctorHome.html';
        } else if (role.role === 'nurse'){
            window.location.href = 'Nurse/nurseHome.html';
        } else if (role.role === 'pharmacist'){
            window.location.href = 'Pharmacist/pharmacistHome.html';
        } else if (role.role === 'healthcoach'){
            window.location.href = 'Health Coach/healthCoachHome.html';
        }

    } catch(error){
        alert('Error: ' +  error);
    }    
});