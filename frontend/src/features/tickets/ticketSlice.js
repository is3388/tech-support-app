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
// protected route that frontend needs to get user's token
// use thunkAPI getState() can get any state from auth or tickets
export const createTicket = createAsyncThunk(
    'tickets/create',
    async(ticketData, thunkAPI) => {
        try {
                const token = thunkAPI.getState().auth.user.token
                return await ticketService.createTicket(ticketData, token)
        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
    builder
    .addCase(createTicket.pending, (state) => {
        state.loading = true
    })
    .addCase(createTicket.fulfilled, (state) => {
        state.loading = false
        state.success = true
    })
    .addCase(createTicket.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload
    })
    }
})

export const {reset} = ticketSlice.actions
export default ticketSlice.reducer