// routes/profile.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.put('/', async (req, res) => {
  try {
    const { id, username, email } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.username = username;
    user.email = email;
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
