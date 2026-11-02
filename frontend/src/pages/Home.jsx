import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import MenuCard from '../components/MenuCard'

function Home() {
  const { menu } = useContext(AppContext)

  // Take the first 3 dishes as featured
  const featured = menu.slice(0, 3)

  return (
    <div className="page">
      <h1>Welcome to Restaurant App</h1>
      <p>Browse our menu, order online and book your table.</p>
      <Link to="/menu"><button>See Menu</button></Link>
      <Link to="/reservations"><button>Book a Table</button></Link>

      <h2>Featured dishes</h2>
      <div className="grid">
        {featured.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default Home