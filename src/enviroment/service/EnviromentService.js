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
}

module.exports = EnviromentService;