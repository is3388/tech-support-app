const registerUser = (req, res) => {
    res.send('Register Route')
}

const loginUser = (req, res) => {
    res.send('Login Route')
}

export {registerUser, loginUser}
// common JS syntax
//module.exports = {registerUser, loginUser}