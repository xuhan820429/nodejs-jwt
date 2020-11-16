/*Setups*/

//import express 
const express = require('express')

//import the body parser middleware
const bodyParser = require('body-parser')

//import the cookie parser middleware
const cookieParser = require('cookie-parser')

//user defined route
const authRouter = require('./routes/authRoute')
const cookieRouter = require('./routes/cookieRoute')

//dao service
const daoService = require('./dao/daoservice')

//creae express app
const app = express()


//middleware bodyparser
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
    //middleware static file 
app.use(express.static("public"))

app.use(cookieParser())

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
app.use(cookieRouter)