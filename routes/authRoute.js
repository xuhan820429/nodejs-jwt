const express = require('express')
const router = express.Router()
const daoService = require('./../dao/daoservice')
const jwtService = require('./../service/jwtService')
const errorService = require('./../service/errorService')

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.get('/logout', (req, res) => {
    jwtService.removeTokenInCookie(res)
    res.redirect('/')
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
        let payload = await daoService.getUser(req.body)
        let token = jwtService.genToken(payload)
        jwtService.setTokenInCookie(res, token)
        res.status(201).json(payload)
    } catch (err) {
        res.status(400).json(errorService.parseError(err))
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
        let payload = await daoService.createUser(req.body)
        let token = jwtService.genToken(payload)
        jwtService.setTokenInCookie(res, token)
        res.status(201).json(payload)
    } catch (err) {
        res.status(400).json(errorService.parseError(err))
    }
})


module.exports = router