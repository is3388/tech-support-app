import mongoose from 'mongoose'
import validator from 'validator'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        trim: true,
        async validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }            
        }
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        trim: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
}, {
    timestamps: true
})

//module.exports = mongoose.model('User', userSchema)
const User = mongoose.model('User', userSchema)
export default User