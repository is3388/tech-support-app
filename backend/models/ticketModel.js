import mongoose from 'mongoose'

const ticketSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    product: {
        type: String,
        required: [true, 'Select a product'],
        enum:['iPhone', 'iPad', 'iMac', 'Macbook Pro']  
    },
    description: {
        type: String,
        required:[true, 'Enter description of the problem']
    },
    status: {
        type: String,
        required: true,
        enum: ['new', 'open', 'closed'],
        default: 'new'
    }
},
    {
        timestamps: true
    }
)

//module.exports = mongoose.model('Ticket', ticketSchema)
const Ticket = mongoose.model('Ticket', ticketSchema)
export default Ticket