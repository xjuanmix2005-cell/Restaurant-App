import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

function Navbar() {
  const { role, setRole, getCartCount } = useContext(AppContext)

  //switch between customer and admin
  function changeRole() {
    if (role === 'customer') {
      setRole('admin')
    } else {
      setRole('customer')
    }
  }

  return (
    <nav className="navbar">
      <h2>Restaurant App</h2>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/cart">Cart ({getCartCount()})</Link>
        <Link to="/reservations">Reservations</Link>
        <Link to="/chat">AI Chat</Link>
        {/* Only show the Admin link if the role is admin*/}
        {role === 'admin' && <Link to="/admin">Admin</Link>}
      </div>
      <button onClick={changeRole}>Mode: {role}</button>
    </nav>
  )
}

export default Navbar