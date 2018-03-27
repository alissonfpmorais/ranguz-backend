import express from 'express'
import productCtrl from '../controllers/products'
import auth from '../../config/auth'

const router = express.Router()

router.route('/')
    .get(productCtrl.list)
    .post(auth.adminAuth, productCtrl.create)

router.route('/:productId')
    .get(productCtrl.get)
    .put(auth.adminAuth, productCtrl.update)
    .delete(auth.adminAuth, productCtrl.remove)

router.param('productId', productCtrl.load)

export default router