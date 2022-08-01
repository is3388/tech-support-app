import {useState} from 'react'
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