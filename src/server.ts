import express from 'express';
import path from 'path';
import contactsRouter from './routes/api';

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../src/routes')));

app.use('/api', contactsRouter);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});

export default app;
