const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/AuthController');

// Inscription : POST /api/auth/register
router.post('/register', authCtrl.register);

// Connexion : POST /api/auth/login
router.post('/login', authCtrl.login);

module.exports = router;