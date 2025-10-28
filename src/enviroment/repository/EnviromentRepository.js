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

    async findVariable(envName, page, limit) {
        try {
            const environment = await this.EnviromentModel.findOne({ name: envName });
            if (!environment) {
                return Result.fail(null, 404, `El entorno "${envName}" no fue encontrado.`);
            }

            const allVariables = environment.variables;
            const total = allVariables.length;
            const skip = (page - 1) * limit;
            const paginatedVariables = allVariables.slice(skip, skip + limit);

            const data = {
                total: total,
                variables: paginatedVariables
            };
            return Result.success(data, 200);
        } catch (error) {
            return Result.fail(error, 500, 'Error interno al buscar las variables.');
        }
    }

    async findVariableByName(envName, varName) {
        try {
            const environment = await this.EnviromentModel.findOne({ name: envName });
            if (!environment) {
                return Result.fail(null, 404, `El entorno "${envName}" no fue encontrado.`);
            }
            const variable = environment.variables.find(v => v.name === varName);
            if (!variable) {
                return Result.fail(null, 404, `La variable "${varName}" no existe en el entorno "${envName}".`);
            }
            return Result.success(variable, 200);
        } catch (error) {
            return Result.fail(error, 500, 'Error interno al buscar la variable.');
        }
    }

    async addVariable(envName, variableData) {
        try {
            const environment = await this.EnviromentModel.findOne({ 
                name: envName, 
                'variables.name': { $ne: variableData.name }
            });

            if (!environment) {
                return Result.fail(null, 409, `El entorno "${envName}" no existe o ya contiene una variable llamada "${variableData.name}".`);
            }
            environment.variables.push(variableData);
            await environment.save();
        
            const newVar = environment.variables[environment.variables.length - 1];
            return Result.success(newVar, 201);

        } catch (error) {
            return Result.fail(error, 500, 'Error interno al añadir la variable.');
        }
    }
    
    async updateVariable(envName, varName, variableData) {
        try {
            const result = await this.EnviromentModel.findOneAndUpdate(
                { name: envName, "variables.name": varName },
                { $set: { "variables.$": { ...variableData, name: varName } } },
                { new: true }
            );

            if (!result) {
                return Result.fail(null, 404, `No se encontró el entorno "${envName}" o la variable "${varName}".`);
            }
            const updatedVar = result.variables.find(v => v.name === varName);
            return Result.success(updatedVar, 200);

        } catch (error) {
            return Result.fail(error, 500, 'Error interno al actualizar la variable.');
        }
    }

    async patchVariable(envName, varName, variableData) {
        try {
            const environment = await this.EnviromentModel.findOne({ name: envName });
            if (!environment) {
                return Result.fail(null, 404, `El entorno "${envName}" no fue encontrado.`);
            }
            const variable = environment.variables.find(v => v.name === varName);
            if (!variable) {
                return Result.fail(null, 404, `La variable "${varName}" no existe en el entorno "${envName}".`);
            }
            Object.assign(variable, variableData);
            await environment.save();
            return Result.success(variable, 200);
        } catch (error) {
            return Result.fail(error, 500, 'Error interno al actualizar la variable.');
        }
    }
    
    async deleteVariable(envName, varName) {
        try {
            const result = await this.EnviromentModel.findOneAndUpdate(
                { name: envName },
                { $pull: { variables: { name: varName } } }
            );

            if (!result || !result.variables.some(v => v.name === varName)) {
                return Result.fail(null, 404, `No se encontró el entorno "${envName}" o la variable "${varName}".`);
            }

            return Result.success(null, 204);
        } catch (error) {
            return Result.fail(error, 500, 'Error interno al eliminar la variable.');
        }
    }



}

module.exports = EnviromentRepository;