const express = require('express');
const router = express.Router({ mergeParams: true });
const VariableController = require('../controller/VariableController');
const authenticate = require('../../core/auth/auth')

const variableController = new VariableController()

// router.get('.json', authenticate, VariableController.getVariablesJsonByEnviroment.bind(variableController));

module.exports = router;