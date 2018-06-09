import Client from '../models/client'
import { transformResource } from './base'

function load(req, res, next, id) {
    Client.findById(id)
        .exec()
        .then(clientDb => {
            req.dbClient = clientDb
            return next()
        }, e => next(e))
}

function get(req, res) {
    return res.json(transformResource(req.dbClient))
}

function create(req, res, next) {
    Client.create({
        name: req.body.name,
        cpf: req.body.cpf,
        register: req.body.register,
        password: req.body.password,
        rfid: req.body.rfid
    }).then(savedClient => {
        console.log("deu certo!")
        res.json(transformResource(savedClient))
    }, e => {
        console.log("deu pau!")
        next(e)
    })
}

function update(req, res, next) {
    const client = req.dbClient
    Object.assign(client, req.body)

    client.save()
        .then(savedClient => res.sendStatus(204), e => next(e))
}

function list(req, res, next) {
    const { limit = 50, skip = 0 } = req.query

    Client.find()
        .skip(skip)
        .limit(limit)
        .exec()
        .then(clientsDb => {
            const clients = clientsDb.map(clientDb => transformResource(clientDb))
            return res.json(clients)
        }, e => next(e))
}

function remove(req, res, next) {
    const client = req.dbClient

    client.remove()
        .then(() => res.sendStatus(204), e => next(e))
}

export default { load, get, create, update, list, remove }