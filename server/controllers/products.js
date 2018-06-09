import Product from '../models/product'
import { transformResource } from './base'

function load(req, res, next, id) {
    Product.findById(id)
        .exec()
        .then(product => {
            req.dbProduct = product
            return next()
        }, e => next(e))
}

function get(req, res) {
    return res.json(transformResource(req.dbProduct))
}

function create(req, res, next) {
    Product.create({
        name: req.body.name,
        value: req.body.value
    }).then(savedProduct => res.json(transformResource(savedProduct)), e => next(e))
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
        .then(productsDb => {
            const products = productsDb.map(productsDb => transformResource(productsDb))
            return res.json(products)
        }, e => next(e))
}

function remove(req, res, next) {
    const product = req.dbProduct

    product.remove()
        .then(() => res.sendStatus(204), e => next(e))
}

export default { load, get, create, update, list, remove }