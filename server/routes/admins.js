import express from 'express'
import adminCtrl from '../controllers/admins'
import authCtrl from '../controllers/auth'
import auth from '../../config/auth'

const router = express.Router()

router.route('/')
    .get(auth, adminCtrl.list)
    .post(adminCtrl.create)

router.route('/:adminId')
    .get(adminCtrl.get)
    .put(adminCtrl.update)
    .delete(adminCtrl.remove)

router.route('/auth')
    .post(authCtrl.adminSecurity,
        authCtrl.authenticate,
        authCtrl.generateToken,
        authCtrl.requestJWT)

router.param('adminId', adminCtrl.load)

export default router