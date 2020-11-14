const sequelize = require('./sequelizeconfig')
const bcrypt = require('bcrypt')
const { QueryTypes } = require('sequelize')

class DaoService {
    constructor() {}

    hashPassword(password) {
        let salt = bcrypt.genSaltSync()
        let newPass = bcrypt.hashSync(password, salt)
        return newPass
    }


    async getUser() {
        try {
            let QUERY = 'select * from users'
            let data = await sequelize.query(QUERY, { type: QueryTypes.SELECT })
            return data
        } catch (err) {
            console.log(err)
        }
    }

    async createUser(body) {
        try {
            let { email, password } = body
            password = this.hashPassword(password)
            let QUERY = "REPLACE INTO users VALUES (:email, :password)"
            await sequelize.query(QUERY, {
                replacements: {
                    email,
                    password
                }
            })
            return body

        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new DaoService()