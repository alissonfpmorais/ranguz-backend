import express from 'express'
import orderCtrl from '../controllers/orders'
import auth from '../../config/auth'

const router = express.Router()

router.route('/')
    .get(orderCtrl.list)
    .post(auth.clientAuth, orderCtrl.create)

router.route('/:orderId')
    .get(orderCtrl.get)
    .put(auth.adminAuth, orderCtrl.update)
    .delete(auth.adminAuth, orderCtrl.remove)

router.param('orderId', orderCtrl.load)

export default router