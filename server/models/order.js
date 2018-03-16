import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
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