import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Ticket from '../models/ticketModel.js'

// @desc     Create new ticket
// @route    POST /api/tickets
// @access   Private
const createTicket = asyncHandler(async (req, res) => {
    const {product, description} = req.body
    if (!product || !description) {
        res.status(400)
        throw new Error('Product and description must be included')
    }
    // since go through auth function, we can access req.user and no query to get the user again
    
    // create a ticket    
    const ticket = await Ticket.create({
        product, 
        description,
        user: req.user.id,
        status: 'new'
    })
    res.status(201).json(ticket)
})

// @desc     Get user's tickets
// @route    GET /api/tickets
// @access   Private
const getTickets = asyncHandler(async (req, res) => {
    // since go through auth function, we can access req.user
    
    const tickets = await Ticket.find({user: req.user.id})
    if (!tickets) {
        res.status(404)
        throw new Error('No tickets found')
    }
    res.status(200).json(tickets)
})

// @desc     Get single ticket
// @route    GET /api/tickets/:id
// @access   Private
const getTicket = asyncHandler(async (req, res) => {
    // since go through auth function, we can access req.user
    // ticket id comes from URL
    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authorized')
    }
    res.status(200).json(ticket)
})

// @desc     Update single ticket
// @route    PATCH /api/tickets/:id
// @access   Private
const updateTicket = asyncHandler(async (req, res) => {
    // since go through auth function, we can access req.user
    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authorized')
    }
    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedTicket)
})

// @desc     Delete single ticket
// @route    DELETE/api/tickets/:id
// @access   Private
const deleteTicket = asyncHandler(async (req, res) => {
    // since go through auth function, we can access req.user
    // ticket id comes from URL
    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authorized')
    }
    await ticket.remove()
    res.status(200).json({success: true})
})

export {getTickets, createTicket, getTicket, updateTicket, deleteTicket}