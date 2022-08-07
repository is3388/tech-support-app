import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import generateToken from '../utils/generateToken.js'

// @desc     Register a new user
// @route    /api/users
// @access   Public
// express-async-handler to handle Promise rejections in Express
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
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
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
    const {email, password} = req.body
    const user = await User.findOne({email})
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(401)
        throw new Error('Invalid credentials')
    }
})

// @desc     Get user profile
// @route    /api/users/profile
// @access   Private
const getProfile = asyncHandler(async (req, res) => {
    // since go through auth function, we can access req.user
    const user = { 
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    res.status(200).json(user)
})

export {registerUser, loginUser, getProfile}
// common JS syntax
//module.exports = {registerUser, loginUser, getProfile}