class LoginResponseDto {
    constructor(user, token) {
        this.user = {
            id: user._id,
            username: user.username
        }
        this.token = token;
    }

    static Create(user, token) {
        return new LoginResponseDto(user, token);
    }
}

module.exports = LoginResponseDto;