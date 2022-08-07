import mongoose from 'mongoose'

const noteSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Ticket'
    },
    text: {
        type: String,
        required: [true, 'Enter some text'],
    },
    isStaff: {
        type: Boolean,
        default: false
    },
    staff: {
        type: String,
    },
}, {
    timestamps: true
})

//module.exports = mongoose.model('User', userSchema)
const Note = mongoose.model('Note', noteSchema)
export default Note