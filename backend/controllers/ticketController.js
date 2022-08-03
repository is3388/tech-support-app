import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Ticket from '../models/ticketModel.js'

// @desc     Create new ticket
// @route    POST /api/tickets
// @access   Private
const createTicket = asyncHandler(async (req, res) => {
    // since go through auth function, we can access req.user
    res.status(200).json({message: 'create ticket'})
})

// @desc     Get user's tickets
// @route    GET /api/tickets
// @access   Private
const getTickets = asyncHandler(async (req, res) => {
    // since go through auth function, we can access req.user
    res.status(200).json({message: 'get tickets'})
})

export {getTickets, createTicket}