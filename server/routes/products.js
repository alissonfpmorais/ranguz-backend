import express from 'express'
import productCtrl from '../controllers/products'

const router = express.Router()

router.route('/')
    .get(productCtrl.list)
    .post(productCtrl.create)

router.route('/:productId')
    .get(productCtrl.get)
    .put(productCtrl.update)
    .delete(productCtrl.remove)

router.param('productId', productCtrl.load)

export default router