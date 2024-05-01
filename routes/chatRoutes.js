const express = require('express');
const router = express.Router();
const User = require('../models/user');
const redis = require('redis');
const client = redis.createClient();

// Middleware for caching
const cacheMiddleware = require('../middleware/cacheMiddleware');

router.get('/recent-messages', cacheMiddleware, async (req, res) => {
  try {
    // Logic to retrieve recent messages from Postgres
    const recentMessages = await Message.findAll({ limit: 10, order: [['createdAt', 'DESC']] });
    
    // Cache recent messages
    client.set('recent-messages', JSON.stringify(recentMessages));
    
    res.status(200).json(recentMessages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
