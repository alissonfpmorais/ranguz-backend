import express from 'express'
import clientCtrl from '../controllers/clients'

const router = express.Router()

router.route('/')
    .get(clientCtrl.list)
    .post(clientCtrl.create)

router.route('/:clientId')
    .get(clientCtrl.get)
    .put(clientCtrl.update)
    .delete(clientCtrl.remove)

router.param('clientId', clientCtrl.load)

export default router