import { configureStore } from '@reduxjs/toolkit'
import ticketReducer from '../features/tickets/ticketSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    ticket: ticketReducer,
    auth: authReducer,
  },
})
