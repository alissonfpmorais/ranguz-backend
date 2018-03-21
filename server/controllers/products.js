import Product from '../models/product'

function load(req, res, next, id) {
    Product.findById(id)
        .exec()
        .then(product => {
            req.dbProduct = product
            return next()
        }, e => next(e))
}

function get(req, res) {
    return res.json(req.dbProduct)
}

function create(req, res, next) {
    Product.create({
        name: req.body.name,
        value: req.body.value
    }).then(savedProduct => res.json(savedProduct), e => next(e))
}

function update(req, res, next) {
    const product = req.dbProduct
    Object.assign(product, req.body)

    product.save()
        .then(savedProduct => res.sendStatus(204), e => next(e))
}

function list(req, res, next) {
    const { limit = 50, skip = 0 } = req.query

    Product.find()
        .skip(skip)
        .limit(limit)
        .exec()
        .then(products => res.json(products), e => next(e))
}

function remove(req, res, next) {
    const product = req.dbProduct

    product.remove()
        .then(() => res.sendStatus(204), next(e))
}

export default { load, get, create, update, list, remove }