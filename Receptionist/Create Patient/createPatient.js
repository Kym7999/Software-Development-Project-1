const form = document.getElementById('patientForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const dob = document.getElementById('dob').value;
  const address = document.getElementById('address').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const allergies = document.getElementById('allergies').value;

  const dobDate = new Date(dob);
  const today = new Date();

  if (dobDate > today) {
    alert('Date of birth cannot be in the future.');
    return; 
  }

  const ageDiffMs = Math.abs(today - dobDate);
  const ageDate = new Date(ageDiffMs);
  const ageYear = ageDate.getUTCFullYear() - 1970;

  if (ageYear > 100) {
    alert('Date of birth cannot be more than 100 years ago.');
    return;
  }

  const patientData = {
    name,
    dob,    
    address,
    phone,
    email,
    allergies
  };

  try{
    const response = await fetch('http://localhost:5000/add-patient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patientData)
    });

    if(response.ok){
      alert('Patient added successfully');
      form.reset();
    } else{
      alert('Email must be unique, enter another email address');
    }
  } catch(error){
    alert('Error: ', error);
  }
});


