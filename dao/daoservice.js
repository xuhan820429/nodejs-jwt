const sequelize = require('./sequelizeconfig')
const { QueryTypes } = require('sequelize')

class DaoService {
    constructor() {}
    async getUser() {
        let QUERY = 'select * from users'
        let data = await sequelize.query(QUERY, { type: QueryTypes.SELECT })
        return data
    }

    async createUser(body) {
        const { email, password } = body
        let QUERY = "INSERT INTO users VALUES (:email, :password)"
        await sequelize.query(QUERY, {
            replacements: {
                email,
                password
            }
        })
        return body
    }





}

module.exports = new DaoService()