/*Setups*/

const daoService = require('./dao/daoservice')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/authRoute')
const cookieRouter = require('./routes/cookieRoute')
    //creae express app
const app = express()


//middleware bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
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