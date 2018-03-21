import express from 'express'
import adminRoutes from './admins'
import clientRoutes from './clients'
import orderRoutes from './orders'
import productRoutes from './products'

const router = express.Router()

router.get('/status', (req, res) => {
    res.json({
        status: `ok`
    })
})

router.use('/admins', adminRoutes)
router.use('/clients', clientRoutes)
router.use('/orders', orderRoutes)
router.use('/products', productRoutes)

export default router