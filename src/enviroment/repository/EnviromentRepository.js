const { EnviromentModel } = require('../schema/EnviromentSchema');
const Result = require('../../core/result-handler/result');

class EnviromentRepository{

    constructor(){
        this.EnviromentModel = EnviromentModel;
    }

    async findEnviromentByName (name) {
        try {
            const enviroment = await this.EnviromentModel.findOne({ name: name }).exec();
            if (enviroment) {
                return Result.success(enviroment, 200);
            } else {
                return Result.fail(new Error(`The enviroment with name "${name}" could not be found`), 404, "Enviroment not found");
            }

        } catch (error) {
            return Result.fail(error, 500, error.message);
        }
    }

}

module.exports = EnviromentRepository;