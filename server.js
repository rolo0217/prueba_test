const express = require('express');
const path = require('path');
const config = require('./config.json');

const app = express();
const PORT = config.server.port || 8000;
const HOST = config.server.host || '0.0.0.0';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'src/routes')));

// In-memory contacts store
let contacts = [
  { id: 1, name: 'Demo', phone: '1234567890' },
];
let nextId = 2;

// Reset contacts to initial state
app.post('/api/contacts/reset', (req, res) => {
  contacts = [{ id: 1, name: 'Demo', phone: '1234567890' }];
  nextId = 2;
  res.json({ message: 'Contacts reset' });
});

// Get all contacts
app.get('/api/contacts', (req, res) => {
  res.json(contacts);
});

// Add a new contact
app.post('/api/contacts', (req, res) => {
  const { name, phone } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }
  const contact = { id: nextId++, name, phone };
  contacts.push(contact);
  res.status(201).json(contact);
});

// Delete a contact
app.delete('/api/contacts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = contacts.findIndex(c => c.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Contact not found' });
  }
  contacts.splice(index, 1);
  res.json({ message: 'Contact deleted successfully' });
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});

module.exports = app;
