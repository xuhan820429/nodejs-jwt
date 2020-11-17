const sequelize = require('./sequelizeconfig')
const passwordService = require('./../service/passwordService')

const { v4: uuidv4 } = require('uuid');
const { QueryTypes } = require('sequelize')

class DaoService {
    constructor() {}


    async getUser(body) {
        try {
            let { email, password } = body
            let QUERY = 'select * from users where email= :email'
            let users = await sequelize.query(QUERY, {
                type: QueryTypes.SELECT,
                replacements: {
                    email
                }
            })
            users = Array.from(users)
            if (users.length == 1) {
                let ifMatched = await passwordService.validatePassword(password, users[0].password)
                if (ifMatched) {
                    return {
                        id: users[0].id,
                        email: users[0].email
                    }
                } else {
                    throw new Error('email and password not matched');
                }
            } else {
                throw new Error('No User Found');
            }
        } catch (err) {
            throw err
        }
    }






    async createUser(body) {
        try {
            let { email, password } = body
            let id = uuidv4()
            password = await passwordService.genPasswordHash(password)
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
            throw err
        }
    }
}

module.exports = new DaoService()