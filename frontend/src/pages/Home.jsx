import {FaQuestionCircle, FaTicketAlt} from 'react-icons/fa'
import {Link} from 'react-router-dom'

function Home () {
    return (
        <>
        <section className='heading'>
            <h3>
                What problem do you need help with?
            </h3>
            <p>
                Please choose from an option below:
            </p>
        </section>
        <Link to='/new-ticket' className='btn btn-reverse btn-block'>
            <FaQuestionCircle />Create New Ticket
        </Link>
        <Link to='/tickets' className='btn btn-block'>
            <FaTicketAlt />View Your Ticket
        </Link>
        </>
    )
}

export default Home