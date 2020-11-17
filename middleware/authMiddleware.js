const jwtService = require('./../service/jwtService')


const canActive = (req, res, next) => {
    let token = jwtService.getTokenFromCookie(req)
    let result = jwtService.verifyToken(token)
    const { decoded, error } = result
    if (error) {
        res.redirect('/login')
    } else {
        next()
    }
}


const checkUser = (req, res, next) => {
    let token = jwtService.getTokenFromCookie(req)
    let result = jwtService.verifyToken(token)
    const { decoded, error } = result
    if (error) {
        res.locals.user = null
    } else {
        res.locals.user = decoded
    }
    next()

}



module.exports = { canActive, checkUser }