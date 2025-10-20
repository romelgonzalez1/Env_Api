const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');
const authenticate = require('../../core/auth/auth')

const userController = new UserController()

router.post('/', authenticate, UserController.CreateUser.bind(userController));
router.post('/login/', UserController.Login.bind(userController));

module.exports = router;