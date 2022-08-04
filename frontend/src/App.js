import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import NewTicket from './pages/NewTicket'
import Tickets from './pages/Tickets'
import Register from './pages/Register'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
    <Router>
      <div className='container'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/new-ticket' element={<PrivateRoute> <NewTicket /> </PrivateRoute>} />
          <Route path='/tickets' element={<PrivateRoute> <Tickets /> </PrivateRoute>} />
        </Routes>
      </div>
    </Router>
    <ToastContainer 
        autoClose={3000} />
    </>
  )
}

export default App
