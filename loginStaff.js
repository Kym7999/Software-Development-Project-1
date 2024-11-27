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
        const response = await fetch('http://localhost:5000/loginStaff', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        });                        
        const role = await response.json();                    
        sessionStorage.removeItem('staffId');
        sessionStorage.setItem('staffId', role.id);


        if(role.role === 'clinicAdmin'){
            window.location.href = 'Clinic Admin/Home/home.html';
        } else if (role.role === 'receptionist'){
            window.location.href = 'Receptionist/Home/home.html';
        } else if (role.role === 'doctor'){
            window.location.href = 'Doctor/Home/home.html';
        } else if (role.role === 'nurse'){
            window.location.href = 'Nurse/Home/home.html';
        } else if (role.role === 'pharmacist'){
            window.location.href = 'Pharmacist/Home/home.html';
        } else if (role.role === 'healthcoach'){
            window.location.href = 'Health Coach/Home/home.html';
        }

    } catch(error){
        alert('Email or Password Invalid');
    }    
});