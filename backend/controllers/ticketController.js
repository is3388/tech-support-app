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
    res.status(200).json(tickets)
})

export {getTickets, createTicket}