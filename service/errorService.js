class ErrorService {
    constructor() {}

    parseError(err) {
        let name = err.name
        let msg = err.message
        if (name === "SequelizeUniqueConstraintError") {
            msg = "User exist, try another one"
        }
        return {
            name,
            msg
        }
    }
}

module.exports = new ErrorService()