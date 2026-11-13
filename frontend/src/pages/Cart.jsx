import { useState, useContext } from 'react'
import { AppContext } from '../context/AppContext'

function Cart() {
  const { cart, orders, changeQuantity, removeFromCart, getCartTotal, placeOrder } = useContext(AppContext)
  const [orderType, setOrderType] = useState('pickup')
  const [message, setMessage] = useState('')

  //called when the user clicks Confirm order
  function handleConfirm() {
    const order = placeOrder(orderType)
    setMessage('Order #' + order.id + ' confirmed! Type: ' + order.type)
  }

  return (
    <div className="page">
      <h1>Your Cart</h1>

      {message !== '' && <p className="success">{message}</p>}

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div className="row" key={item.id}>
              <span>{item.name} - ${item.price.toFixed(2)}</span>
              <div>
                <button onClick={() => changeQuantity(item.id, -1)}>-</button>
                <span> {item.quantity} </span>
                <button onClick={() => changeQuantity(item.id, 1)}>+</button>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}

          <h3>Total: ${getCartTotal().toFixed(2)}</h3>

          <label>
            <input type="radio" checked={orderType === 'pickup'} onChange={() => setOrderType('pickup')} /> Pickup
          </label>
          <label>
            <input type="radio" checked={orderType === 'delivery'} onChange={() => setOrderType('delivery')} /> Delivery
          </label>
          <br />
          <button onClick={handleConfirm}>Confirm order</button>
        </div>
      )}

      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div className="card" key={order.id}>
            <p>Order #{order.id} ({order.type})</p>
            {order.items.map((item) => (
              <p key={item.id}>{item.name} x{item.quantity}</p>
            ))}
            <p>Total: ${order.total.toFixed(2)}</p>
            <p>Status: {order.status}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default Cart
