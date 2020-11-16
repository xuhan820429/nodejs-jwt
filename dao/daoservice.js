const sequelize = require('./sequelizeconfig')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid');
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
            throw err
        }
    }

    async createUser(body) {
        try {
            let { email, password } = body
            let id = uuidv4()
            password = this.hashPassword(password)
            let QUERY = "INSERT INTO users VALUES (:id, :email, :password)"
            await sequelize.query(QUERY, {
                replacements: {
                    id,
                    email,
                    password
                }
            })
            return {
                id,
                email
            }

        } catch (err) {
            console.log('dao---------------------------')
            throw err
        }
    }
}

module.exports = new DaoService()