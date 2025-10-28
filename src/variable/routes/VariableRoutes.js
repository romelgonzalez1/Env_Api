const express = require('express');
const router = express.Router({ mergeParams: true });
const VariableController = require('../controller/VariableController');
const authenticate = require('../../core/auth/auth')

const variableController = new VariableController()

router.get('/', authenticate, VariableController.getAllVariables.bind(variableController));
router.post('/', authenticate, VariableController.createVariable.bind(variableController));

module.exports = router;