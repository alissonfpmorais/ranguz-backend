import express from 'express'
import adminCtrl from '../controllers/admins'

const router = express.Router()

router.route('/')
    .get(adminCtrl.list)
    .post(adminCtrl.create)

router.route('/:adminId')
    .get(adminCtrl.get)
    .put(adminCtrl.update)
    .delete(adminCtrl.remove)

router.param('adminId', adminCtrl.load)

export default router