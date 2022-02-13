const express = require('express');

const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

router.post('/signup', authController.signUp);

router.post('/login', authController.login);

router.get('/profile', authController.protect, userController.getUser);

module.exports = router;
