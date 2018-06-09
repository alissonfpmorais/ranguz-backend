import express from 'express'
import orderCtrl from '../controllers/orders'
import auth from '../../config/auth'

const router = express.Router()

router.route('/')
    .get(orderCtrl.list)
    .post(auth.clientAuth, orderCtrl.create)

router.route('/:orderId')
    .get(orderCtrl.get)
    .put(auth.clientAuth, orderCtrl.update)
    .delete(auth.clientAuth, orderCtrl.remove)

router.route('/finish/:rfid')
    .get(orderCtrl.finishOrder)

router.param('orderId', orderCtrl.load)
router.param('rfid', orderCtrl.loadByRfid)

export default router