import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link} from 'react-router-dom'

function Header () {
    return (
        <header className='header'>
            <div className='logo'>
                <Link to ='/'>
                    Tech Support
                </Link>
            </div>
            <ul>
                <li>
                    <Link to='/login'>
                        <FaSignInAlt />Sign In
                    </Link>
                </li>
                <li>
                    <Link to='/register'>
                    <FaUser />Sign Up
                    </Link>
                </li>
            </ul>
        </header>

    )
}

export default Header