const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// User registration endpoint
router.post('/register', UserController.register);

// User authentication endpoint
router.post('/login', UserController.login);

module.exports = router;
