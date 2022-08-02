import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
    user: null,
    error: false,
    success: false,
    loading: false,
    message: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    // function takes in builder that allow to add cases such as register pending/fulfill to change state
    extraReducers:(builder) => {

    }
})

export default authSlice.reducer