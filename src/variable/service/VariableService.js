const Result = require('../../core/result-handler/result');
const VariableRepository = require('../repository/VariableRepository');
const EnviromentRepository = require('../../enviroment/repository/EnviromentRepository');

class VariableService {

    constructor() {
        this._repository = new VariableRepository();
        this._enviromentRepository = new EnviromentRepository();
    }

    async getVariableByName(name) {

        const result = await this._repository.findUserByUsername(username)

        return result;

    }

    async createVariable(createVariableRequest) {

        const enviroment = await this._enviromentRepository.findEnviromentByName(createVariableRequest.env_name);

        if (!enviroment.isSuccess()) {
            return Result.fail(new Error(`The environment "${createVariableRequest.env_name}" does not exist.`), 404, "Environment not found");
        }

        const variableData = { name: createVariableRequest.name, description: createVariableRequest.description, value: createVariableRequest.value, env_name: createVariableRequest.env_name };

        const result = await this._repository.createVariable(variableData);

        return result;
    }

    async getVariablesJsonByEnviroment(name) {
        const enviroment = await this._enviromentRepository.findEnviromentByName(name);
        if (!enviroment.isSuccess()) {
            return Result.fail(new Error(`The environment "${name}" does not exist.`), 404, "Environment not found");
        }
        const result = await this._repository.getVariablesByEnviroment(name);

        var variables = {};

        result.value.forEach(v => {
            variables[v.name] = v.value;
        });

        return Result.success(variables, 200);
    }


}

module.exports = VariableService;