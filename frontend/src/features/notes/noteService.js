import axios from "axios"

const base_URL = '/api/tickets/'

const createNote = async(noteText, ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(base_URL + ticketId + '/notes' , 
        { text: noteText
        }, 
        config)
    return response.data 
}

const getNotes = async(ticketId, token) => {
    // send token must be sent in headers - Authorization field
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(base_URL + ticketId + '/notes' , config)
    return response.data
}

const noteService = {getNotes, createNote}
export default noteService