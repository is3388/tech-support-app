import express from 'express'
import {getTickets, createTicket, getTicket, updateTicket, deleteTicket} from '../controllers/ticketController.js'
import {auth} from '../middleware/auth.js'

const router = express.Router()

router.route('/').get(auth, getTickets).post(auth, createTicket)
router.route('/:id').get(auth, getTicket).patch(auth, updateTicket).delete(auth, deleteTicket)

export default router