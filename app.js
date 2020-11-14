/*Setups*/

const daoService = require('./dao/daoservice')
const express = require('express')
const bodyparser = require('body-parser')
const authRouter = require('./routes/authRoute')
    //creae express app
const app = express()


//middleware bodyparser
app.use(bodyparser.urlencoded({ extended: true }));
//middleware static file 
app.use(express.static("public"))

//setup view engine
app.set('view engine', 'ejs')
app.listen(3000, () => {
    console.log('server listen on port 3000')
})


/* actual logic*/

app.get('/', async(req, res) => {
    res.render('home')
})

app.get('/smoothies', (req, res) => {
    res.render('smoothies')
})


app.use(authRouter)