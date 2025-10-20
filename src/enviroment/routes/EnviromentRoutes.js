const express = require('express');
const router = express.Router();
const EnviromentController = require('../controller/EnviromentController');
const authenticate = require('../../core/auth/auth')

const enviromentController = new EnviromentController()

router.get('/:env_name', authenticate, EnviromentController.getEnviromentByName.bind(enviromentController));

module.exports = router;