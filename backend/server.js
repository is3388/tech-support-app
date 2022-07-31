import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRouter from './routes/userRoutes.js'
import {errorHandler} from './middleware/errorMiddleware.js'

dotenv.config()

const port = process.env.PORT || 5000

// connect to database
connectDB()

const app = express()

// set body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Tech Support API')
})

// register routes
app.use('/api/users', userRouter)
//app.use('/api/users', require('./routes/userRoutes.js'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started running in ${process.env.NODE_ENV} mode on port ${port}`))