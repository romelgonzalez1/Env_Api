const express = require('express');
const router = express.Router();
const EnviromentController = require('../controller/EnviromentController');
const authenticate = require('../../core/auth/auth')

const enviromentController = new EnviromentController();

router.get('/:env_name.json', authenticate, EnviromentController.getFlatJson.bind(enviromentController));

router.get('/', authenticate, EnviromentController.getAllEnviroments.bind(enviromentController));

router.get('/:env_name', authenticate, EnviromentController.getEnviromentByName.bind(enviromentController));

router.post('/', authenticate, EnviromentController.createEnviroment.bind(enviromentController));

router.put('/:env_name', authenticate, EnviromentController.updateEnviroment.bind(enviromentController));

router.patch('/:env_name', authenticate, EnviromentController.partialUpdateEnviroment.bind(enviromentController));

router.delete('/:env_name', authenticate, EnviromentController.deleteEnviroment.bind(enviromentController));

//Rutas para variables dentro de un entorno
router.get('/:env_name/variables', authenticate, EnviromentController.getVariable.bind(enviromentController));
router.get('/:env_name/variables/:var_name', authenticate, EnviromentController.getVariableByName.bind(enviromentController));
router.post('/:env_name/variables', authenticate, EnviromentController.addVariable.bind(enviromentController));
router.put('/:env_name/variables/:var_name', authenticate, EnviromentController.updateVariable.bind(enviromentController));
router.patch('/:env_name/variables/:var_name', authenticate, EnviromentController.patchVariable.bind(enviromentController));
router.delete('/:env_name/variables/:var_name', authenticate, EnviromentController.deleteVariable.bind(enviromentController));

module.exports = router;