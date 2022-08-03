import {Navigate} from 'react-router-dom'
import {useAuthStatus} from '../hooks/useAuthStatus'
import Spinner from '../components/Spinner'

const PrivateRoute = ({children}) => {
    // const {user, loading} = useSelector((state) => state.auth)
    const {loggedIn, loading} = useAuthStatus()
    
    if (loading)
    {
        return <Spinner />
    }
    // return user ? children : <Navigate to='/login' />
    return loggedIn ? children : <Navigate to='/login' />
}

export default PrivateRoute
