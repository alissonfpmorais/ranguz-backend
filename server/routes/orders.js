import express from 'express'
import orderCtrl from '../controllers/orders'

const router = express.Router()

router.route('/')
    .get(orderCtrl.list)
    .post(orderCtrl.create)

router.route('/:orderId')
    .get(orderCtrl.get)
    .put(orderCtrl.update)
    .delete(orderCtrl.remove)

router.param('orderId', orderCtrl.load)

export default router