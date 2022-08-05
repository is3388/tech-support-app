import {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {getTicket} from '../features/tickets/ticketSlice'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import {toast} from 'react-toastify'

function Ticket () {
    const {ticket, loading, error, message} = useSelector((state) => state.ticket)
    const {ticketId} = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        if (error) {
            toast.error(message)
        }
        dispatch(getTicket(ticketId))
        // eslint-disable-next-line
    }, [error, message, ticketId])
    
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
                </header>
                <h3>
                    Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>
                        {ticket.status}
                    </span>
                </h3>
                <h3>
                    Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
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
            </div> 
            )
   
}

export default Ticket