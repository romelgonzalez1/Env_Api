const { EnviromentModel } = require('../schema/EnviromentSchema');
const Result = require('../../core/result-handler/result');

class EnviromentRepository{

    constructor(){
        this.EnviromentModel = EnviromentModel;
    }

    async findAllEnviromentsPaginated(page, limit) {
        try {
            const enviroments = await this.EnviromentModel.find()
                .skip((page - 1) * limit)
                .limit(limit)
                .exec();
            const total = await this.EnviromentModel.countDocuments().exec();
            return Result.success({ enviroments, total, page, limit }, 200);
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

    async createEnviroment (data) {
        try {
            const newEnviroment = new this.EnviromentModel(data);
            await newEnviroment.save();
            return Result.success(newEnviroment, 201);
        } catch (error) {

            if (error.code === 11000) {
                return Result.fail(new Error('Enviroment with this name already exists'), 409, 'Duplicate enviroment name');
            }
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

module.exports = EnviromentRepository;