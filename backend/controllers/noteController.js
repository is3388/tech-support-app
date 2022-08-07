import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Note from '../models/noteModel.js'
import Ticket from '../models/ticketModel.js'

// @desc     Get a note from a single ticket
// @route    GET /api/tickets/:ticketId/notes
// @access   Private
const getNote = asyncHandler(async (req, res) => {
    // since go through auth function, we can access req.user
    // ticket id comes from URL
    const ticket = await Ticket.findById(req.params.ticketId)
    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authorized')
    }
    const note = await Note.find({ticket: req.params.ticketId})
    if (!note) {
        res.status(404)
        throw new Error('No notes for this ticket')
    }
    res.status(200).json(note)
})

// @desc     Add a note to a single ticket
// @route    POST /api/tickets/:ticketId/notes
// @access   Private
const addNote = asyncHandler(async (req, res) => {
    // since go through auth function, we can access req.user
    // ticket id comes from URL
    const ticket = await Ticket.findById(req.params.ticketId)
    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authorized')
    }
    const note = await Note.create({
        text: req.body.text,
        isStaff: false,
        user: req.user.id,
        ticket: req.params.ticketId})
    
    res.status(201).json(note)
})

export {getNote, addNote}