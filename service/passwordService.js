const bcrypt = require('bcrypt')

class PasswordService {
    constructor() {

    }
    async genPasswordHash(password) {
        let salt = await bcrypt.genSalt()
        let hashed = await bcrypt.hash(password, salt)
        return hashed
    }

    async validatePassword(origin, hashed) {
        let isValid = await bcrypt.compare(origin, hashed)
        return isValid
    }
}

module.exports = new PasswordService()