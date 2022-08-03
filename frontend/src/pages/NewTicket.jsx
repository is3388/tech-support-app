import {useState} from 'react'
import {useSelector} from 'react-redux'

function NewTicket () {

    const {user} = useSelector((state) => state.auth)
    const [name] = useState(user.name)
    const [email] = useState(user.email)
    const [product, setProduct] = useState('iPhone')
    const [description, setDescription] = useState('The problem is ...')

    const onSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <>
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