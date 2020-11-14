const express = require('express')
const router = express.Router()


router.get('/getc', (req, res) => {
    console.log(req.cookies)
    res.send(req.cookies)
})


router.get('/setc', (req, res) => {

    res.cookie('name', 'iamleohan')
    res.cookie('age', '11')

    res.send('test cookie')

})

module.exports = router