const form = document.getElementById('patientForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const dob = document.getElementById('dob').value;
  const address = document.getElementById('address').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const allergies = document.getElementById('allergies').value;
  
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
    } else{
      alert('Error adding patient');
    }
  } catch(error){
    alert('Error: ', error);
  }
  form.reset();
});