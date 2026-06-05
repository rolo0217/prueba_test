const API_URL = 'http://localhost:8000/api/contacts';

async function loadContacts() {
  const res = await fetch(API_URL);
  const contacts = await res.json();
  renderContacts(contacts);
}

function renderContacts(contacts) {
  const list = document.getElementById('contacts-list');
  const count = document.getElementById('contact-count');
  list.innerHTML = '';
  count.textContent = contacts.length;

  contacts.forEach(contact => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="contact-info">
        <span class="contact-name">&#128100; ${contact.name}</span>
        <span class="contact-phone">&#128222; ${contact.phone}</span>
      </div>
      <button class="delete-btn" data-id="${contact.id}" title="Delete">&#128465;</button>
    `;
    list.appendChild(li);
  });

  list.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteContact(btn.dataset.id));
  });
}

async function deleteContact(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (res.ok) {
    showSuccess('Contact deleted successfully');
    loadContacts();
  }
}

document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, phone }),
  });

  if (res.ok) {
    showSuccess('Contact added successfully');
    document.getElementById('contact-form').reset();
    loadContacts();
  }
});

function showSuccess(message) {
  const msg = document.getElementById('success-message');
  msg.textContent = message;
  msg.classList.remove('hidden');
  setTimeout(() => msg.classList.add('hidden'), 3000);
}

loadContacts();
