import Order from '../models/order'
import { transformResource } from './base'

function load(req, res, next, id) {
    Order.findById(id)
        .exec()
        .then(orderDb => {
            req.dbOrder = orderDb
            return next()
        }, e => next(e))
}

function loadByRfid(req, res, next, rfid) {
    Order.findOne({ "client.rfid": rfid, done: false })
        .exec()
        .then(orderDb => {
            console.log('loadByRfid')
            req.dbOrder = orderDb
            return next()
        }, e => next(e))
}

function get(req, res) {
    return res.json(transformResource(req.dbOrder))
}

function create(req, res, next) {
    Order.create({
        client: req.body.client,
        cart: req.body.cart
    }).then(savedOrder => res.json(transformResource(savedOrder)), e => next(e))
}

function update(req, res, next) {
    const order = req.dbOrder
    Object.assign(order, req.body)

    order.save()
        .then(savedOrder => res.sendStatus(204), e => next(e))
}

function list(req, res, next) {
    const { limit = 50, skip = 0 } = req.query

    Order.find()
        .skip(skip)
        .limit(limit)
        .exec()
        .then(ordersDb => {
            const orders = ordersDb.map(orderDb => transformResource(orderDb))
            return res.json(orders)
        }, e => next(e))
}

function remove(req, res, next) {
    const order = req.dbOrder

    order.remove()
        .then(() => res.sendStatus(204), e => next(e))
}

function finishOrder(req, res, next) {
    const order = req.dbOrder

    console.log(`fo2: ${order}`)

    if (order) {
        console.log('finishOrder')

        Object.assign(order, { done: true })
        console.log(`fo3: ${order}`)

        order.save()
            .then(savedOrder => {
                const result = [{ Retorno: 1 }]

                console.log('fO Success')
                res.json(result)
            }, e => {
                const result = [{ Retorno: 0 }]

                console.log('fO Error')
                res.json(result)
            })
    } else {
        res.send('resultado:0')
    }
}

export default { load, loadByRfid, get, create, update, list, remove, finishOrder }