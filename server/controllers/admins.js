import Admin from '../models/admin'
import { transformResource } from './base'

function load(req, res, next, id) {
    Admin.findById(id)
        .exec()
        .then(admin => {
            req.dbAdmin = admin
            return next()
        }, e => next(e))
}

function get(req, res) {
    return res.json(transformResource(req.dbAdmin))
}

function create(req, res, next) {
    Admin.create({
        username: req.body.username,
        password: req.body.password
    }).then(savedAdmin => res.json(transformResource(savedAdmin)), e => next(e))
}

function update(req, res, next) {
    const admin = req.dbAdmin
    Object.assign(admin, req.body)

    admin.save()
        .then(savedAdmin => res.sendStatus(204), e => next(e))
}

function list(req, res, next) {
    const { limit = 50, skip = 0 } = req.query

    Admin.find()
        .skip(skip)
        .limit(limit)
        .exec()
        .then(adminsDb => {
            const admins = adminsDb.map(adminsDb => transformResource(adminsDb))
            return res.json(admins)
        }, e => next(e))
}

function remove(req, res, next) {
    const admin = req.dbAdmin

    admin.remove()
        .then(() => res.sendStatus(204), e => next(e))
}

export default { load, get, create, update, list, remove }