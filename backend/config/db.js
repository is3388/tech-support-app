import colors from 'colors'
import mongoose from 'mongoose'

const connectDB = async () => {
    try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline)
    }
    catch(error) {
        console.log(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
        //return console.error(`Error: ${error.message}`.red.underline.bold)
    }
}

export default connectDB