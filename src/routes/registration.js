const formData = {};

function showStep(step) {
  document.querySelectorAll('.step').forEach(s => s.classList.add('hidden'));
  document.getElementById(`step-${step}`).classList.remove('hidden');

  document.querySelectorAll('.progress-step').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`progress-${step}`).classList.add('active');
}

document.getElementById('next-1').addEventListener('click', () => {
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const dateOfBirth = document.getElementById('dateOfBirth').value;

  if (!firstName || !lastName || !email || !phone || !dateOfBirth) return;

  formData.firstName = firstName;
  formData.lastName = lastName;
  formData.email = email;
  formData.phone = phone;
  formData.dateOfBirth = dateOfBirth;

  showStep(2);
});

document.getElementById('prev-2').addEventListener('click', () => showStep(1));

document.getElementById('next-2').addEventListener('click', () => {
  const street = document.getElementById('street').value.trim();
  const city = document.getElementById('city').value.trim();
  const state = document.getElementById('state').value.trim();
  const zipCode = document.getElementById('zipCode').value.trim();
  const country = document.getElementById('country').value.trim();

  if (!street || !city || !state || !zipCode || !country) return;

  formData.street = street;
  formData.city = city;
  formData.state = state;
  formData.zipCode = zipCode;
  formData.country = country;

  document.getElementById('confirm-name').textContent = `${formData.firstName} ${formData.lastName}`;
  document.getElementById('confirm-email').textContent = formData.email;
  document.getElementById('confirm-phone').textContent = formData.phone;
  document.getElementById('confirm-dob').textContent = formData.dateOfBirth;
  document.getElementById('confirm-address').textContent = formData.street;
  document.getElementById('confirm-city').textContent = `${formData.city}, ${formData.state}`;
  document.getElementById('confirm-state').textContent = formData.state;
  document.getElementById('confirm-zip').textContent = formData.zipCode;
  document.getElementById('confirm-country').textContent = formData.country;

  showStep(3);
});

document.getElementById('prev-3').addEventListener('click', () => showStep(2));

document.getElementById('submit-form').addEventListener('click', () => {
  const success = document.getElementById('submit-success');
  success.classList.remove('hidden');
  document.getElementById('submit-form').disabled = true;
});
