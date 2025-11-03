import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// in-memory data stores
const users = [];
const transactions = [];
let userIdCounter = 1;
let transactionIdCounter = 1;

// middleware for authentication
app.use((req, res, next) => {
  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
  if (authHeader !== 'Bearer test-token') return res.status(401).json({ error: 'Unauthorized' });
  next();
});

// create user
app.post('/api/users', (req, res) => {
  const { name, email, accountType } = req.body || {};
  if (!name || !email || !accountType) return res.status(400).json({ error: 'name, email, accountType required' });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return res.status(400).json({ error: 'Invalid email' });

  const user = { id: `u-${userIdCounter++}`, name, email, accountType };
  users.push(user);
  return res.status(201).json(user);
});

// get user by id
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// create transaction
app.post('/api/transactions', (req, res) => {
  const { userId, amount, type, recipientId } = req.body || {};
  if (!userId || amount === undefined || !type || !recipientId)
    return res.status(400).json({ error: 'userId, amount, type, recipientId required' });
  if (typeof amount !== 'number' || amount <= 0) return res.status(400).json({ error: 'Invalid amount' });

  const user = users.find(u => u.id === userId);
  if (!user) return res.status(400).json({ error: 'Invalid userId' });

  const tx = { id: `t-${transactionIdCounter++}`, userId, amount, type, recipientId };
  transactions.push(tx);
  res.status(201).json(tx);
});

// get all transactions by user
app.get('/api/transactions/:userId', (req, res) => {
  const userTxs = transactions.filter(t => t.userId === req.params.userId);
  res.json(userTxs);
});

const port = Number(process.env.API_PORT) || 4000;
app.listen(port, () => console.log(`✅ Mock API server running on http://localhost:${port}`));
