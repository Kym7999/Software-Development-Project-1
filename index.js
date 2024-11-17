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
        const response = await fetch('http://localhost:5000/loginPatient', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        });            

        const patient = await response.json();    
        
        if (patient != null){
            sessionStorage.removeItem('patientId');
            sessionStorage.setItem('patientId', patient);                      
            window.location.href = 'Patient/Home/home.html';
        }

    } catch(error){
        alert('Email or Password Invalid');
    }    
});