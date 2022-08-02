import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {register, reset} from '../features/auth/authSlice'
import {FaUser} from 'react-icons/fa'
import {toast} from 'react-toastify'

function Register () {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const {name, email, password, confirmPassword} = formData

    const dispatch = useDispatch()
    const {user, success, error, loading, message} = useSelector((state) => state.auth)
    const navigate = useNavigate()
    useEffect(() => {
        if (error) {
            toast.error(message)
        }
        if (success && user) {
            navigate('/')
        }
        dispatch(reset())
    }, [error, success, loading, message, user, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value
    }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error("Passwords don't match")
        }
        else {
            const userData = {
                name,
                email,
                password
            }
            dispatch(register(userData))
        }
    }

    return (
        <>
        <section className='heading'>
            <h3>
                <FaUser /> Register
            </h3>
            <p>Create an account</p>
        </section>
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                <label htmlFor="name">*Name:</label>
                    <input 
                        type='text'
                        className='form-control'
                        id='name'
                        value={name}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="email">*Email Address:</label>
                    <input 
                        type='email'
                        className='form-control'
                        id='email'
                        value={email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="password">*Password:</label>
                    <input 
                        type='password'
                        className='form-control'
                        id='password'
                        value={password}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="confirmPassword">*Confirm Password:</label>
                    <input 
                        type='password'
                        className='form-control'
                        id='confirmPassword'
                        value={confirmPassword}
                        onChange={onChange}
                        required
                    />
                    
                </div>
                <div className='form-group'>
                    <button className='btn btn-block'>
                        Submit
                    </button>
                </div>
            </form>
        </section>
        </>
    )
}

export default Register