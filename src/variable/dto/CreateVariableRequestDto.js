class CreateVariableRequestDto {
    constructor(variable, env_name){
        this.env_name = env_name;
        this.name = variable.name;
        this.value = variable.value;
        this.description = variable.description;
    }

    static fromRequest(req){
        return new CreateVariableRequestDto(req.body, req.params.env_name);
    }

}

module.exports = CreateVariableRequestDto;