import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {createTicket, reset} from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function NewTicket () {

    const {user} = useSelector((state) => state.auth)
    const [name] = useState(user.name)
    const [email] = useState(user.email)
    const [product, setProduct] = useState('iPhone')
    const [description, setDescription] = useState('')
    const {loading, error, success, message} = useSelector((state) => state.ticket)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (error) {
            toast.error(message)
        }
        if (success && user) {
            dispatch(reset())
            navigate('/tickets')
        }
        dispatch(reset())
    }, [dispatch, navigate, error, success, message, user])

    const onSubmit = (e) => {
        e.preventDefault()
        // dispatch action that ticketService handle
        dispatch(createTicket({product, description}))
    }
    return loading ? <Spinner /> : (
        <>
        <BackButton url='/' />
        <section className='heading'>
            <h3>Create New Ticket</h3>
            <p>Fill out the form below</p>
        </section>
        <section className='form'>
            <div className='form-group'>
                <label htmlFor='name'>Customer Name:</label>
                <input 
                    type='text' 
                    id='name' 
                    value={name} 
                    className='form-control' 
                    disabled
                />
            </div>
            <div className='form-group'>
                <label htmlFor='email'>Customer Email:</label>
                <input 
                    type='email' 
                    id='email' 
                    value={email} 
                    className='form-control' 
                    disabled
                />
            </div>
            <form onSubmit={onSubmit}>
            <div className='form-group'>
                <label htmlFor='product'>Product:</label>
                <select 
                    name='product' 
                    id='product'
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                >
                    <option value='iPad'>iPad</option>
                    <option value='iPhone'>iPhone</option>
                    <option value='iMac'>iMac</option>
                    <option value='Mac book'>Macbook</option>
                    <option value='Mac book Pro'>Macbook Pro</option>
                </select>
            </div>
            <div className='form-group'>
                <label htmlFor='description'>Description:</label>
                <textarea
                    name='description'
                    id='description'
                    value={description}
                    className='form-control'
                    onChange={(e) => setDescription(e.target.value)}
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

export default NewTicket