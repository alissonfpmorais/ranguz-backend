import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
})

AdminSchema.pre('adminSave', function (next) {
    const admin = this

    if (!admin.isModified('password')) return next()

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)

        bcrypt.hash(admin.password, salt, (hashErr, hash) => {
            if (hashErr) return next(hashErr)

            user.password = hash
            next()
        }) 
    })
})

AdminSchema.methods.comparePassword = function(toCompare, done) {
    bcrypt.compare(toCompare, this.password, (err, isMatch) => {
        if (err) done(err)
        else done(err, isMatch)
    })
}

export default mongoose.model('Admin', AdminSchema)