import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes.js'

dotenv.config()

const port = process.env.PORT || 5000
const app = express()

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Tech Support API')
})

// register routes
app.use('/api/users', userRouter)
//app.use('/api/users', require('./routes/userRoutes.js'))





app.listen(port, () => console.log(`Server started running in ${process.env.NODE_ENV} mode on port ${port}`))