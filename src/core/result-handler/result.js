class Result {
    constructor(value, error, responseCode, message) {
        this.value = value;
        this.error = error;
        this.responseCode = responseCode;
        this.message = message;
    }

    isSuccess() {
        // Verifica si hay valor (incluyendo 0 como valor válido)
        return this.value !== null && this.value !== undefined;
    }

    get Value() {
        if (this.isSuccess()) {
            return this.value;
        }
        throw new Error('The value does not exist');
    }

    get Error() {
        if (this.error) {
            return this.error;
        }
        throw new Error('The error does not exist');
    }

    get StatusCode() {
        return this.responseCode;
    }

    get Message() {
        if (this.message) {
            return this.message;
        }
        throw new Error('The message does not exist');
    }

    static success(value, statusCode) {
        return new Result(value, null, statusCode, null);
    }

    static fail(error, errorCode, message) {
        return new Result(null, error, errorCode, message);
    }
}

// Exportamos la clase para poder usarla en otros módulos
module.exports = Result;