const express = require('express')
const router = express.Router()
const daoService = require('./../dao/daoservice')

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
        let response = await daoService.createUser(req.body.user)
        res.send(response)
    } catch (err) {

        console.log(err)
        res.status(404).send('err')
    }
})


module.exports = router