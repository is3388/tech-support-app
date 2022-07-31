import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'

// @desc     Register a new user
// @route    /api/users
// @access   Public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Name, email and password must be included')
    }
    // check if user exists in database
    const userExists = await User.findOne({email})
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    // hash password and store in database
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    // create user
    const user = await User.create({
        name,
        email,
        password: hashPassword
    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user._name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc     Login a user
// @route    /api/users/login
// @access   Public
const loginUser = asyncHandler(async (req, res) => {
    res.send('Login Route')
})

export {registerUser, loginUser}
// common JS syntax
//module.exports = {registerUser, loginUser}