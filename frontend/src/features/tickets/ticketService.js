import axios from "axios"

const base_URL = '/api/tickets'
const createTicket = async(ticketData, token) => {
    // send token must be sent in headers - Authorization field
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(base_URL, ticketData, config)
    return response.data
}

const getTickets = async(token) => {
    // send token must be sent in headers - Authorization field
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(base_URL, config)
    return response.data
}

const ticketService = {createTicket, getTickets}
export default ticketService