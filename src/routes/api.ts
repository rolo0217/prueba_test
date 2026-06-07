import { Router, Request, Response } from 'express';

const router = Router();

interface Contact {
  id: number;
  name: string;
  phone: string;
}

let contacts: Contact[] = [
  { id: 1, name: 'Demo', phone: '1234567890' },
];
let nextId = 2;

router.post('/contacts/reset', (req: Request, res: Response) => {
  contacts = [{ id: 1, name: 'Demo', phone: '1234567890' }];
  nextId = 2;
  res.json({ message: 'Contacts reset' });
});

router.get('/contacts', (req: Request, res: Response) => {
  res.json(contacts);
});

router.post('/contacts', (req: Request, res: Response) => {
  const { name, phone } = req.body;
  if (!name || !phone) {
    res.status(400).json({ error: 'Name and phone are required' });
    return;
  }
  const contact: Contact = { id: nextId++, name, phone };
  contacts.push(contact);
  res.status(201).json(contact);
});

router.delete('/contacts/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = contacts.findIndex(c => c.id === id);
  if (index === -1) {
    res.status(404).json({ error: 'Contact not found' });
    return;
  }
  contacts.splice(index, 1);
  res.json({ message: 'Contact deleted successfully' });
});

export default router;
