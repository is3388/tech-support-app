import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import ticketService from './ticketService'

const initialState = {
    ticket: {}, // single ticket
    tickets: [],
    loading: false,
    success: false,
    error: false,
    message: ''
}

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder => {

    })
})

export const {reset} = ticketSlice.actions
export default ticketSlice.reducer