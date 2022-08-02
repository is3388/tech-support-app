import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
    user: null,
    error: false,
    success: false,
    loading: false,
    message: ''
}

// create an asyncthunk function to use async data
export const register = createAsyncThunk(
    'auth/register', 
    async(user, thunkAPI) => {
        console.log(user)
    })

export const login = createAsyncThunk(
        'auth/login', 
        async(user, thunkAPI) => {
            console.log(user)
        })

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    // function takes in builder that allow to add cases such as register pending/fulfill to change state
    extraReducers:(builder) => {

    }
})

export default authSlice.reducer