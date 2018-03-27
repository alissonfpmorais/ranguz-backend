import jwt from 'jsonwebtoken'
import config from '../../config/env'
import Admin from '../models/admin'
import Client from '../models/client'

function adminSecurity(req, res, next) {
    Admin.findOne({
        username: req.body.username
    })
    .exec()
    .then(admin => {
        req.maybeUser = admin
        req.secret = config.jwtAdminSecret
        req.duration = config.jwtDuration

        next()
    }, e => next(e))
}

function clientSecurity(req, res, next) {
    Client.findOne( {
        cpf: req.body.cpf
    })
    .exec()
    .then(client => {
        req.maybeUser = client
        req.secret = config.jwtClientSecret
        req.duration = config.jwtDuration

        next()
    }, e => next(e))
}

function authenticate(req, res, next) {
    const user = req.maybeUser

    if (!user) return next()

    user.comparePassword(req.body.password, (e, isMatch) => {
        if (e) return next(e)

        if (isMatch) {
            req.user = user
            next()
        } else {
            return next()
        }
    })
}

function generateToken(req, res, next) {
    if (!req.user) return next()

    const jwtPayload = { id: req.user._id }
    const jwtData = { expiresIn: req.duration }
    const jwtSecret = req.secret

    req.token = jwt.sign(jwtPayload, jwtSecret, jwtData)

    next()
}

function requestJWT(req, res) {
    if (!req.user) {
        res.status(401).json({
            error: 'Unauthorized'
        })
    } else {
        res.status(200).json({
            token: req.token
        })
    }
}

export default { adminSecurity, clientSecurity, authenticate, generateToken, requestJWT }