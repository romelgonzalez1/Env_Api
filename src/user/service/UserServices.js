const Result = require('../../core/result-handler/result');
const UserRepository = require('../repository/UserRepository');
const BcryptService = require('../../core/bcrypt/BcryptService');
const JwtService = require('../../core/auth/JwtService')
const LoginResponseDto = require('../dto/LoginResponseDto')

class UserService {

    constructor() {
        this._repository = new UserRepository();
        this._bcryptService = new BcryptService();
        this._jwtService = new JwtService();
    }

    async getUserByUsername(username) {

        const result = await this._repository.findUserByUsername(username)

        return result;

    }

    async createUser(createUserRequest) {

        const validUser = await this._repository.findUserByUsername(createUserRequest.username);

        if (validUser.isSuccess()) {
            return Result.fail(new Error(`The username "${createUserRequest.username}" is already taken.`), 400, "Username already taken");
        }

        const hashedPassword = await this._bcryptService.hash(createUserRequest.password);
        const userData = { username: createUserRequest.username, password: hashedPassword };

        const result = await this._repository.createUser(userData);

        return result;
    }

    async login(loginData){

        const user = await this._repository.findUserByUsername(loginData.username);

        if(!user.isSuccess()){
            return Result.fail(new Error(`Credenciales incorrectas`), 401, "Unauthorized");
        }

        const isMatch = await this._bcryptService.compare(loginData.password, user.value.password)

        if(!isMatch){
            return Result.fail(new Error(`Credenciales incorrectas`), 401, "Unauthorized");
        }

        const loginResponse = LoginResponseDto.Create(user.value, this._jwtService.generateToken(user.value._id));

        return Result.success(loginResponse, 200);
    }

}

module.exports = UserService;