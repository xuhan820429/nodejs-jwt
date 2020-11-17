const jwt = require('jsonwebtoken')

class JWTService {
    constructor() {
        this._secret = "default secret"
        this._maxJWTAge = 60 * 60 * 24 * 3
        this._maxCookieAge = 60 * 60 * 24 * 3 * 1000
    }
    set secret(v) {
        this._secret = v
    }
    set maxJWTAge(v) {
        this._maxage = v
    }
    set maxCookieAge(v) {
        this._maxCookieAge = v
    }

    genToken(data) {
        return jwt.sign(data, this._secret, {
            expiresIn: this._maxJWTAge
        })
    }
    verifyToken(token) {
        let result = {}
        try {
            var decoded = jwt.verify(token, this._secret);
            result = { decoded }
        } catch (error) {
            result = { error }
        }
        return result
    }

    setTokenInCookie(res, token) {
        res.cookie('jwt', token, {
            maxAge: this._maxCookieAge,
            httpOnly: true
        })
    }

    getTokenFromCookie(req) {
        return req.cookies['jwt']
    }
}

module.exports = new JWTService()