import express from 'express'
import clientCtrl from '../controllers/clients'
import authCtrl from '../controllers/auth'

const router = express.Router()

router.route('/')
    .get(clientCtrl.list)
    .post(clientCtrl.create)

router.route('/:clientId')
    .get(clientCtrl.get)
    .put(clientCtrl.update)
    .delete(clientCtrl.remove)

router.route('/auth')
    .post(authCtrl.clientSecurity,
        authCtrl.authenticate,
        authCtrl.generateToken,
        authCtrl.requestJWT)

router.param('clientId', clientCtrl.load)

export default router