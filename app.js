const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/user');

const app = express();
app.use(bodyParser.json());


app.use('/profile', profileRouter);
// User registration endpoint
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// User authentication endpoint
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


const messagingServer = require('./messaging');

messagingServer.listen(4000, () => {
  console.log('Messaging server running on port 4000');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

