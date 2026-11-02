import { createContext, useState } from 'react'
import menuData from '../data/menuData'

//the context lets all pages share the same data
export const AppContext = createContext()

export function AppProvider({ children }) {
  //state - the data we share between pages
  const [menu, setMenu] = useState(menuData)
  const [cart, setCart] = useState([])
  const [orders, setOrders] = useState([])
  const [reservations, setReservations] = useState([])
  const [role, setRole] = useState('customer') // customer or admin
  const [nextMenuId, setNextMenuId] = useState(13)

  //Cart

  //add a dish to the cart
  function addToCart(dish) {
    let found = false
    const newCart = []
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === dish.id) {
        //the dish is already in the cart, so add 1 to the quantity
        found = true
        newCart.push({ ...cart[i], quantity: cart[i].quantity + 1 })
      } else {
        newCart.push(cart[i])
      }
    }
    //if it was not in the cart, add it with quantity 1
    if (found === false) {
      newCart.push({ ...dish, quantity: 1 })
    }
    setCart(newCart)
  }

  //change the quantity of a dish 
  function changeQuantity(id, amount) {
    const newCart = []
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === id) {
        const newQuantity = cart[i].quantity + amount
        //only keep the dish if the quantity is more than 0
        if (newQuantity > 0) {
          newCart.push({ ...cart[i], quantity: newQuantity })
        }
      } else {
        newCart.push(cart[i])
      }
    }
    setCart(newCart)
  }

  //remove a dish from the cart
  function removeFromCart(id) {
    setCart(cart.filter((item) => item.id !== id))
  }

  //add up the price of everything in the cart
  function getCartTotal() {
    let total = 0
    for (let i = 0; i < cart.length; i++) {
      total = total + cart[i].price * cart[i].quantity
    }
    return total
  }

  //count how many items are in the cart
  function getCartCount() {
    let count = 0
    for (let i = 0; i < cart.length; i++) {
      count = count + cart[i].quantity
    }
    return count
  }

  //Orders

  //create an order with what is in the cart, then empty the cart
  function placeOrder(type) {
    const newOrder = {
      id: orders.length + 1,
      items: cart,
      total: getCartTotal(),
      type: type,
      status: 'Pending',
    }
    setOrders([...orders, newOrder])
    setCart([])
    return newOrder
  }

  //change the status of an order
  function updateOrderStatus(id, status) {
    const newOrders = []
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].id === id) {
        // ... copies the order, then we change only the status
        newOrders.push({ ...orders[i], status: status })
      } else {
        newOrders.push(orders[i])
      }
    }
    setOrders(newOrders)
  }

  //Menu, it's used by the Admin

  //create a new dish
  function addMenuItem(dish) {
    dish.id = nextMenuId
    dish.available = true
    setMenu([...menu, dish])
    setNextMenuId(nextMenuId + 1)
  }

  //update a dish
  function updateMenuItem(id, newDish) {
    const newMenu = []
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].id === id) {
        newMenu.push({ ...newDish, id: id, available: menu[i].available })
      } else {
        newMenu.push(menu[i])
      }
    }
    setMenu(newMenu)
  }

  //delete a dish
  function deleteMenuItem(id) {
    setMenu(menu.filter((item) => item.id !== id))
  }

  //switch a dish between available and not available
  function toggleAvailability(id) {
    const newMenu = []
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].id === id) {
        newMenu.push({ ...menu[i], available: !menu[i].available })
      } else {
        newMenu.push(menu[i])
      }
    }
    setMenu(newMenu)
  }

  //Resevations

  //save a new reservation
  function addReservation(reservation) {
    reservation.id = reservations.length + 1
    reservation.status = 'Pending'
    setReservations([...reservations, reservation])
  }

  //change the status of a reservation Approved or Cancelled
  function updateReservationStatus(id, status) {
    const newReservations = []
    for (let i = 0; i < reservations.length; i++) {
      if (reservations[i].id === id) {
        newReservations.push({ ...reservations[i], status: status })
      } else {
        newReservations.push(reservations[i])
      }
    }
    setReservations(newReservations)
  }

  //everything inside value can be used by the other components
  return (
    <AppContext.Provider
      value={{
        menu, cart, orders, reservations, role, setRole,
        addToCart, changeQuantity, removeFromCart, getCartTotal, getCartCount,
        placeOrder, updateOrderStatus,
        addMenuItem, updateMenuItem, deleteMenuItem, toggleAvailability,
        addReservation, updateReservationStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}