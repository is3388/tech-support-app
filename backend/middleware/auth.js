import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const auth = asyncHandler( async (req, res, next) => {
    let token
    // check for token in headers (Authorization: Bearer token)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try { // get token
                // token = req.headers.authorization.split('')[1]
                token = req.headers.authorization.replace('Bearer ', '')
                // verify the token
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                // get the user from token and decoded.id is from jwt.sign(id) you pass into
                req.user = await User.findById(decoded.id).select('-password') // exclude password
                if (!req.user) {
                    res.status(401);
                    throw new Error('Not authirised');
                }
                next()
        }
        catch (error) {
            console.log(error)
            res.status(401)
            throw new Error ('Not authorized')
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

export {auth}
