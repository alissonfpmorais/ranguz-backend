import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    cpf: {
        type: String,
        required: true,
        trim: true
    },
    register: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    balance: {
        type: Number,
        required: true,
    }
})

ClientSchema.pre('save', function (next) {
    const client = this

    if (!client.isModified('password')) return next()

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)

        bcrypt.hash(client.password, salt, (hashErr, hash) => {
            if (hashErr) return next(hashErr)

            client.password = hash
            next()
        })
    })
})

ClientSchema.methods.comparePassword = function(toCompare, done) {
    bcrypt.compare(toCompare, this.password, (err, isMatch) => {
        if (err) done(err)
        else done(err, isMatch)
    })
}

export default mongoose.model('Client', ClientSchema)