import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit'
import authService from './authService'

// get user from local storage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    error: false,
    success: false,
    loading: false,
    message: ''
}

// create an asyncthunk function to use async data and thunkAPI is asyncthunk's method
export const register = createAsyncThunk(
    'auth/register', //first argument is like action type
    async(user, thunkAPI) => {
        //console.log(user)
        try {
                return await authService.register(user)
        }
        catch (error) {
            // error from backend and set to global state message
            const message = (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString()
            return thunkAPI.rejectWithValue(message) // message will pass to register.rejected's action.payload
        }
    })

    export const login = createAsyncThunk(
        'auth/login', //first argument is like action type
        async(user, thunkAPI) => {
            //console.log(user)
            try {
                    return await authService.login(user)
            }
            catch (error) {
                // error from backend and set to global state message
                const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
                return thunkAPI.rejectWithValue(message) // message will pass to register.rejected's action.payload
            }
        })

    /*export const logout = createAsyncThunk(
        'auth/logout',
        async() => {
            await authService.logout()
        }
    ) */
    export const logout = createAction("auth/logout", () => {
        authService.logout()
        return {}
      })

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Action creator-resetting state 
        // to default gets called in useEffect in the Register.
        // since reset doesn't have pending, fulfilled, rejected, put it here
        // do not reset state.user = null unless logout. It depends on prevState
        reset: (state) => {
            state.loading = false;
            state.success = false;
            state.error = false;
            state.message = '';
        },
        //logout: state => {
            //state.user = null
          //}
    },
    // function takes in builder that allow to add cases/action typesuch as register pending/fulfill to change state
    extraReducers:(builder) => {
        builder
        .addCase(register.pending, (state) => {
            state.loading = true
        })
        .addCase(register.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.error = false
            state.user = action.payload
        })
        .addCase(register.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = true
            state.user = null
            state.message = action.payload
        })
        //.addCase(logout.fulfilled, (state) => {
            //state.user = null
        //})
        .addCase(logout, (state) => {
            state.user = null;
          })
        .addCase(login.pending, (state) => {
            state.loading = true
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.error = false
            state.user = action.payload
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = true
            state.user = null
            state.message = action.payload
        })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer