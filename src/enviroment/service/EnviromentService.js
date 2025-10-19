const Result = require('../../core/result-handler/result');
const EnviromentRepository = require('../repository/EnviromentRepository');

class EnviromentService {

    constructor() {
        this._repository = new EnviromentRepository();
    }

    async getEnviromentByName(name) {

        const result = await this._repository.findEnviromentByName(name)

        return result;

    }

}

module.exports = EnviromentService;