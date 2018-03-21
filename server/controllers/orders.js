import Order from '../models/order'

function load(req, res, next, id) {
    Order.findById(id)
        .exec()
        .then(order => {
            req.dbOrder = order
            return next()
        }, e => next(e))
}

function get(req, res) {
    return res.json(req.dbOrder)
}

function create(req, res, next) {
    Order.create({
        cart: req.body.cart
    }).then(savedOrder => res.json(savedOrder), e => next(e))
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
        .then(orders => res.json(orders), e => next(e))
}

function remove(req, res, next) {
    const order = req.dbOrder

    order.remove()
        .then(() => res.sendStatus(204), next(e))
}

export default { load, get, create, update, list, remove }