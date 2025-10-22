const express = require('express');
const router = express.Router();
const EnviromentController = require('../controller/EnviromentController');
const authenticate = require('../../core/auth/auth')

const enviromentController = new EnviromentController()

router.get('/', authenticate, EnviromentController.getAllEnviroments.bind(enviromentController));

router.get('/:env_name', authenticate, EnviromentController.getEnviromentByName.bind(enviromentController));

router.post('/', authenticate, EnviromentController.createEnviroment.bind(enviromentController));

router.put('/:env_name', authenticate, EnviromentController.updateEnviroment.bind(enviromentController));

router.patch('/:env_name', authenticate, EnviromentController.partialUpdateEnviroment.bind(enviromentController));

router.delete('/:env_name', authenticate, EnviromentController.deleteEnviroment.bind(enviromentController));

module.exports = router;