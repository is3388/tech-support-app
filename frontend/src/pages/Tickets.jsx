import {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getTickets, reset} from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import TicketItem from '../components/TicketItem'

function Tickets () {
    const {user} = useSelector((state) => state.auth)
    const {tickets, loading, success} = useSelector((state) => state.ticket)
    const dispatch = useDispatch()

    /*useEffect(() => {
        
        if (!success) dispatch(getTickets())
        return () => {
          if (success) dispatch(reset())
        }
      }, [dispatch, success])*/

      useEffect(() => {
        return () => {
          if (success) {
            dispatch(reset())
          }
        }
      }, [dispatch, success])
    
      useEffect(() => {
        dispatch(getTickets())
      }, [dispatch])

    return loading ? <Spinner /> 
                   : (
                    <>
                        <BackButton url='/' />
                        <h2>Tickets for {user.name}</h2>
                            <div className='tickets'>
                                <div className='ticket-headings'>
                                    <div>Date</div>
                                    <div>Product</div>
                                    <div>Status</div>
                                    <div></div>
                                </div>
                                {tickets.map((ticket) => 
                                ( <TicketItem 
                                    key={ticket._id}
                                    ticket={ticket}
                                    />
                                ))
                                }
                                <Link onClick={() => dispatch(reset())}
                                      to='/tickets/new'
                                      className='btn btn-reverse btn-block'
                                >
                                    Create New Ticket
                                </Link>
                            </div>
                    </>
                    )
}

export default Tickets