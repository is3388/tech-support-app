import {useState} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import {toast} from 'react-toastify'

function Login () {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const {email, password} = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value
    }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

       
    }

    return (
        <>
        <section className='heading'>
            <h3>
                <FaSignInAlt /> Login
            </h3>
            <p>Log in to tech support</p>
        </section>
        <section className='form'>
            <form onSubmit={onSubmit}>
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
                    <button className='btn btn-block'>
                        Submit
                    </button>
                </div>
            </form>
        </section>
        </>
    )
}

export default Login