import { useState, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import MenuCard from '../components/MenuCard'

function Menu() {
  const { menu, addToCart } = useContext(AppContext)

  // One state for each filter
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [dietary, setDietary] = useState('All')
  const [maxPrice, setMaxPrice] = useState('')

  // Go through the menu and keep only the dishes that match the filters
  const filteredMenu = []
  for (let i = 0; i < menu.length; i++) {
    const item = menu[i]
    let show = true

    if (search !== '' && !item.name.toLowerCase().includes(search.toLowerCase())) {
      show = false
    }
    if (category !== 'All' && item.category !== category) {
      show = false
    }
    if (dietary !== 'All' && item.dietary !== dietary) {
      show = false
    }
    if (maxPrice !== '' && item.price > Number(maxPrice)) {
      show = false
    }

    if (show === true) {
      filteredMenu.push(item)
    }
  }

  return (
    <div className="page">
      <h1>Menu</h1>

      <div className="filters">
        <input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All categories</option>
          <option>Starters</option>
          <option>Mains</option>
          <option>Desserts</option>
          <option>Beverages</option>
        </select>
        <select value={dietary} onChange={(e) => setDietary(e.target.value)}>
          <option value="All">All diets</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="gluten-free">Gluten-free</option>
        </select>
        <input type="number" placeholder="Max price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
      </div>

      {/* If there are no dishes, show a message. If not, show the list */}
      {filteredMenu.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <div className="grid">
          {filteredMenu.map((item) => (
            <MenuCard key={item.id} item={item} onAdd={addToCart} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Menu