import express from 'express'
import {getNote, addNote} from '../controllers/noteController.js'
import {auth} from '../middleware/auth.js'

// route is /api/tickets/:ticketId/notes, so /api/tickets/:ticketId is the parent/base
const router = express.Router({mergeParams: true}) // this route merge into parent /api/tickets/:ticketId

router.route('/').get(auth, getNote).post(auth, addNote)


export default router