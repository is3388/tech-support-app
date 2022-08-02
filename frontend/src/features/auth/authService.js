import axios from 'axios'

const baseURL = '/api/users'

// register user
const register = async (userData) => {
    const response = await axios.post(baseURL, userData)
    if (response.data) {
    // save user data and token to local storage
    localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// login user
const login = async (userData) => {
    const response = await axios.post(`${baseURL}/login`, userData)
    if (response.data) {
    // save user data and token to local storage
    localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const logout = () => localStorage.removeItem('user')

const authService = {register, login, logout}

export default authService 