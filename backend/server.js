import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import path from 'path'
import userRouter from './routes/userRoutes.js'
import ticketRouter from './routes/ticketRoutes.js'
import {errorHandler} from './middleware/errorMiddleware.js'

dotenv.config()

const port = process.env.PORT || 5000

// connect to database
connectDB()

const app = express()

// set body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// register routes
app.use('/api/users', userRouter)
//app.use('/api/users', require('./routes/userRoutes.js'))

app.use('/api/tickets', ticketRouter)

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
// set a static path and build folder that contains static assets
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (_, res) => { // load the index.html in build folder
        res.sendFile(path.resolve(__dirname, '/frontend/build/index.html'))
}) 
}
else {
    app.get('/', (req, res) => {
        res.status(200).send('Welcome to the Tech Support API')
    })
}

app.use(errorHandler)

app.listen(port, () => console.log(`Server started running in ${process.env.NODE_ENV} mode on port ${port}`))