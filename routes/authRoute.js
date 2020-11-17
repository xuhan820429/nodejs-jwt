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
    let error = err.message
    console.log('dddddddddd')
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

/**
 * in:
 * {
 *  email:
 *  password:
 * }
 */
router.post('/login', async(req, res) => {
    try {
        let user = await daoService.getUser(req.body)
        let token = createToken(user)
        res.cookie('jwt', token)
        res.status(201).json(user)
    } catch (err) {
        let error = handleErrors(err)
        res.status(400).json(error)
    }

})


/*
in:
{
    email:xxx,
    password:xxx
}

out:
{
    id:xxx,
    email:xxx
}
or
{
    error:xxxx
}
*/
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