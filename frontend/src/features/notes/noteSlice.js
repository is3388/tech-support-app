import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import noteService from './noteService'

const initialState = {
    notes: [], // multiple note per a ticket
    error: false,
    success: false,
    loading: false,
    message: ''
}

export const createNote = createAsyncThunk(
    'notes/create',
    async({noteText, ticketId}, thunkAPI) => {
        try {
                const token = thunkAPI.getState().auth.user.token
                return await noteService.createNote(noteText, ticketId, token)
        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getNotes = createAsyncThunk(
    'notes/getAll',
    async(ticketId, thunkAPI) => {
        try {
                const token = thunkAPI.getState().auth.user.token
                return await noteService.getNotes(ticketId, token)
        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(getNotes.pending, (state) => {
            state.loading = true
        })
        .addCase(getNotes.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.notes = action.payload
        })
        .addCase(getNotes.rejected, (state, action) => {
            state.loading = false
            state.error = true
            state.message = action.payload
        })
        .addCase(createNote.pending, (state) => {
            state.loading = true
        })
        .addCase(createNote.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.notes.push(action.payload) // Redux toolkit allows you to push it, so that no need to reload in UI
        })
        .addCase(createNote.rejected, (state, action) => {
            state.loading = false
            state.error = true
            state.message = action.payload
        })
    }
})

export const {reset} = noteSlice.actions
export default noteSlice.reducer