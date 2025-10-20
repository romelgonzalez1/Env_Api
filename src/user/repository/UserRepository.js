const { UserModel } = require('../schema/UserSchema');
const Result = require('../../core/result-handler/result');

class UserRepository{

    constructor(){
        this.UserModel = UserModel;
    }

    async findUserByUsername (username) {
        try {
            const user = await this.UserModel.findOne({ username: username }).exec();
            if (user) {
                return Result.success(user, 200);
            } else {
                return Result.fail(new Error(`The user with username "${username}" could not be found`), 404, "User not found");
            }

        } catch (error) {
            return Result.fail(error, 500, error.message);
        }
    }

    async createUser (userData) {
        try {
            const newUser = new this.UserModel(userData);
            const savedUser = await newUser.save();
            return Result.success(savedUser, 201);
        } catch (error) {
            return Result.fail(error, 500, error.message);
        }
    }

}

module.exports = UserRepository;