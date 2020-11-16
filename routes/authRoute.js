const express = require('express')
const router = express.Router()
const daoService = require('./../dao/daoservice')
const jwt = require('jsonwebtoken')
const secret = 'iamleohan'
const jwt_max_age = 60 * 60 * 24 * 3 //3 days
const cookie_max_age = 60 * 60 * 24 * 3 * 1000 //3 days

function createToken(user) {
    return jwt.sign(user, secret, {
        expiresIn: jwt_max_age
    })
}

function handleErrors(err) {

    let error = err.name
    if (err.name === "SequelizeUniqueConstraintError") {
        error = "User exist, try another one"
    }
    return { error }
}

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/login', (req, res) => {
    console.log(req.body)
    console.log(JSON.stringify(req.body))
    res.send(req.body)
})

router.post('/signup', async(req, res) => {
    try {
        let user = await daoService.createUser(req.body)
        let token = createToken(user)
        res.cookie('jwt', token, {
            maxAge: cookie_max_age,
            httpOnly: true
        })
        res.status(201).json(user)
    } catch (err) {
        let error = handleErrors(err)
        res.status(400).json(error)
    }
})


module.exports = router