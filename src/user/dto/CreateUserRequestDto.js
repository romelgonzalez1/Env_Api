class CreateUserRequestDto {
    constructor(user){
        this.username = user.username;
        this.password = user.password;
    }

    static fromRequest(req){
        return new CreateUserRequestDto(req.body);
    }

}

module.exports = CreateUserRequestDto;