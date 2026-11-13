import { useState, useContext } from 'react'
import { AppContext } from '../context/AppContext'

function Admin() {
  const {
    role, menu, addMenuItem, updateMenuItem, deleteMenuItem, toggleAvailability,
    orders, updateOrderStatus, reservations, updateReservationStatus,
  } = useContext(AppContext)

  //one state for each field of the dish form
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Mains')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [price, setPrice] = useState('')
  const [dietary, setDietary] = useState('none')

  //editingId is null when we are adding, or the dish id when we are editing
  const [editingId, setEditingId] = useState(null)

  //only admins can see this page
  if (role !== 'admin') {
    return (
      <div className="page">
        <h1>Admin</h1>
        <p>Only admins can see this page. Switch to admin mode in the top bar.</p>
      </div>
    )
  }

  //empty the form
  function clearForm() {
    setName('')
    setCategory('Mains')
    setDescription('')
    setIngredients('')
    setPrice('')
    setDietary('none')
    setEditingId(null)
  }

  //add a new dish or save the changes of an existing one
  function handleSubmit(e) {
    e.preventDefault()

    //check name and price
    if (name === '' || price === '' || Number(price) <= 0) {
      alert('Name and a valid price are required')
      return
    }

    const dish = {
      name: name,
      category: category,
      description: description,
      ingredients: ingredients,
      price: Number(price),
      dietary: dietary,
    }

    if (editingId === null) {
      addMenuItem(dish)
    } else {
      updateMenuItem(editingId, dish)
    }
    clearForm()
  }

  //put the dish data inside the form so it can be edited
  function startEdit(item) {
    setEditingId(item.id)
    setName(item.name)
    setCategory(item.category)
    setDescription(item.description)
    setIngredients(item.ingredients)
    setPrice(item.price)
    setDietary(item.dietary)
  }

  return (
    <div className="page">
      <h1>Admin Dashboard</h1>

      <h2>{editingId === null ? 'Add menu item' : 'Edit menu item'}</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Starters</option>
          <option>Mains</option>
          <option>Desserts</option>
          <option>Beverages</option>
        </select>
        <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input placeholder="Ingredients" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
        <input type="number" step="0.01" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <select value={dietary} onChange={(e) => setDietary(e.target.value)}>
          <option value="none">No diet tag</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="gluten-free">Gluten-free</option>
        </select>
        <button type="submit">{editingId === null ? 'Add item' : 'Save changes'}</button>
      </form>

      <h2>Menu items</h2>
      {menu.map((item) => (
        <div className="row" key={item.id}>
          <span>
            {item.name} (${item.price.toFixed(2)}) - {item.available ? 'Available' : 'Not available'}
          </span>
          <div>
            <button onClick={() => toggleAvailability(item.id)}>Change availability</button>
            <button onClick={() => startEdit(item)}>Edit</button>
            <button onClick={() => deleteMenuItem(item.id)}>Delete</button>
          </div>
        </div>
      ))}

      <h2>Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div className="row" key={order.id}>
            <span>Order #{order.id} - ${order.total.toFixed(2)} ({order.type})</span>
            <select value={order.status} onChange={(e) => updateOrderStatus(order.id, e.target.value)}>
              <option>Pending</option>
              <option>Preparing</option>
              <option>Ready</option>
              <option>Delivered</option>
            </select>
          </div>
        ))
      )}

      <h2>Reservations</h2>
      {reservations.length === 0 ? (
        <p>No reservations yet.</p>
      ) : (
        reservations.map((r) => (
          <div className="row" key={r.id}>
            <span>{r.type} - {r.name} - {r.date} {r.time} - {r.status}</span>
            <div>
              <button onClick={() => updateReservationStatus(r.id, 'Approved')}>Approve</button>
              <button onClick={() => updateReservationStatus(r.id, 'Cancelled')}>Cancel</button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Admin
