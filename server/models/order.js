import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    client: {
        type: {
            clientId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'clients'
            },
            name: {
                type: String,
                required: true
            },
            rfid: {
                type: String,
                required: true
            }
        }
    },
    cart: {
        type: [
            { 
                name: { 
                    type: String,
                    required: true
                },
                value: {
                    type: Number,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ],
        required: true
    },
    done: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model('Order', OrderSchema)