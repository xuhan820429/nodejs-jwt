const sequelize = require('./sequelizeconfig')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid');
const { QueryTypes } = require('sequelize')

class DaoService {
    constructor() {}

    async hashPassword(password) {
        let salt = await bcrypt.genSalt()
        let newPass = await bcrypt.hash(password, salt)
        return newPass
    }

    async comparePassword(originPass, encryptedPass) {
        return await bcrypt.compare(originPass, encryptedPass)
    }


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
            console.log(users)
            if (users.length == 1) {
                let ifMatched = await this.comparePassword(password, users[0].password)
                console.log(ifMatched)
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
            password = await this.hashPassword(password)
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
            console.log('333333333')
            throw err
        }
    }
}

module.exports = new DaoService()