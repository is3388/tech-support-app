import {useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {getTicket, closeTicket} from '../features/tickets/ticketSlice'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import {toast} from 'react-toastify'

function Ticket () {
    const {ticket, loading, error, message} = useSelector((state) => state.ticket)
    const {ticketId} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (error) {
            toast.error(message)
        }
        dispatch(getTicket(ticketId))
        // eslint-disable-next-line
    }, [error, message, ticketId])

    const onTicketClose =  () => {
        dispatch(closeTicket(ticketId))
        toast.success('Ticket Closed')
        navigate('/tickets')
    }
    
    if (loading) {
        return <Spinner />
    }
    if (error) {
        return <h3>Something went wrong</h3>
    }
    return (
            <div className='ticket-page'>
                <header className='ticket-header'>
                    <BackButton url='/tickets' />
                    
                
                <h3>
                    Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>
                        {ticket.status}
                    </span>
                </h3>
                <h3>
                    Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
                </h3>
                <h3>
                    Product: {ticket.product}
                </h3>
                <hr />
                <div className='ticket-desc'>
                    <h3>
                        Description of the Problem:
                    </h3>
                    <p>
                        {ticket.description}
                    </p>
                </div>
                </header>  
                {ticket.status !== 'closed' && (
                        <button className='btn btn-block btn-danger'
                                onClick={onTicketClose}
                        >
                            Close Ticket
                        </button>
                    )}  
            </div> 
            )
   
}

export default Ticket