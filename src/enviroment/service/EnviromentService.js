const Result = require('../../core/result-handler/result');
const EnviromentRepository = require('../repository/EnviromentRepository');

class EnviromentService {

    constructor() {
        this._repository = new EnviromentRepository();
    }


    async findAllEnviroments(page, limit) {
        const result = await this._repository.findAllEnviromentsPaginated(page, limit);
        return result;
    }

    async getEnviromentByName(name) {

        const result = await this._repository.findEnviromentByName(name)

        return result;

    }

    async createEnviroment(data) {
        const result = await this._repository.createEnviroment(data)        
        return result;
    }

    async updateEnviroment(name, data) {
        const result = await this._repository.updateEnviroment(name, data);
        return result;
    }

    async partialUpdateEnviroment(name, data) {
        const result = await this._repository.updateEnviroment(name, data);
        return result;
    }

    async deleteEnviroment(name) {
        const result = await this._repository.deleteEnviroment(name);
        return result;
    }

    async getVariable(envName, page, limit) {
        const result = await this._repository.findVariable(envName, page, limit);
        return result;
    }

    async getVariableByName(envName, varName) {
        const result = await this._repository.findVariableByName(envName, varName);
        return result;
    }

    async addVariable(envName, variableData) {
        const result = await this._repository.addVariable(envName, variableData);
        return result;
    }

    async updateVariable(envName, varName, variableData) {
        const result = await this._repository.updateVariable(envName, varName, variableData);
        return result;
    }

    async patchVariable(envName, varName, variableData) {
        const result = await this._repository.patchVariable(envName, varName, variableData);
        return result;
    }

    async deleteVariable(envName, varName) {
        const result = await this._repository.deleteVariable(envName, varName);
        return result;
    }

    async getFlatJson(envName) {
        const envResult = await this._repository.findEnviromentByName(envName);

        if (!envResult.isSuccess()) {
            return envResult;
        }

        const environment = envResult.Value;
        const flatJson = environment.variables.reduce((acc, variable) => {
            acc[variable.name] = variable.value;
            return acc;
        }, {});
        return Result.success(flatJson, 200);
    }
}

module.exports = EnviromentService;