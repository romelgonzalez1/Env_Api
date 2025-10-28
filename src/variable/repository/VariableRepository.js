const { VariableModel } = require('../schema/VariableSchema');
const Result = require('../../core/result-handler/result');

class VariableRepository{

    constructor(){
        this.VariableModel = VariableModel;
    }

    async findAllVariablesPaginated(page, limit, env_name) {
        try {
            const variables = await this.VariableModel.find({ env_name: env_name })
                .skip((page - 1) * limit)
                .limit(limit)
                .exec();
            const total = await this.VariableModel.countDocuments({ env_name: env_name }).exec();
            return Result.success({ variables, total, page, limit }, 200);
        } catch (error) {
            return Result.fail(error, 500, error.message);
        }
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

    async getVariablesByEnviroment(name) {
        try {
            const variables = await this.VariableModel.find({ env_name: name }).exec();
            return Result.success(variables, 200);
        } catch (error) {
            return Result.fail(error, 500, error.message);
        }
    }

    async createVariable (data) {
        try {
            const newVariable = new this.VariableModel(data);
            const savedVariable = await newVariable.save();
            return Result.success(savedVariable, 201);
        } catch (error) {
            return Result.fail(error, 500, error.message);
        }
    }

    async updateEnviroment (name, data) {
        try {
            const updatedEnviroment = await this.EnviromentModel.findOneAndUpdate(
                { name: name },
                data,
                { new: true, runValidators: true }
            ).exec();
            if (updatedEnviroment) {
                return Result.success(updatedEnviroment, 200);
            } else {
                return Result.fail(new Error(`The enviroment with name "${name}" could not be found`), 404, "Enviroment not found");
            }
        } catch (error) {
            if (error.code === 11000) {
                return Result.fail(new Error('Enviroment with this name already exists'), 409, 'Duplicate enviroment name');
            }
            return Result.fail(error, 500, error.message);
        }
    }

    async deleteEnviroment (name) {
        try {
            const deletedEnviroment = await this.EnviromentModel.findOneAndDelete({ name: name }).exec();
            if (deletedEnviroment) {
                return Result.success(deletedEnviroment, 200);
            } else {
                return Result.fail(new Error(`The enviroment with name "${name}" could not be found`), 404, "Enviroment not found");
            }
        } catch (error) {
            return Result.fail(error, 500, error.message);
        }
    }

}

module.exports = VariableRepository;