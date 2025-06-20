class ApiError {
    constructor(
        statusCode, message = "Something went wrong", errors = []
    ) {
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.errors = errors
    }
}
export {ApiError}