import express from 'express'
import {getTickets, createTicket} from '../controllers/ticketController.js'
import {auth} from '../middleware/auth.js'

const router = express.Router()

router.route('/').get(auth, getTickets).post(auth, createTicket)

export default router