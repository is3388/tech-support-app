import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT || 5000
const app = express()

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Tech Support API')
})



app.listen(port, () => console.log(`Server started running in ${process.env.NODE_ENV} mode on port ${port}`))