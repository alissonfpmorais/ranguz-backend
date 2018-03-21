import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    cart: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: 'products'
    },
    done: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model('Order', OrderSchema)