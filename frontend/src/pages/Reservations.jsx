import { useState, useContext } from 'react'
import { AppContext } from '../context/AppContext'

function Reservations() {
  const { reservations, addReservation } = useContext(AppContext)

  // One state for each field of the form
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [guests, setGuests] = useState(2)
  const [type, setType] = useState('Table')
  const [notes, setNotes] = useState('')
  const [message, setMessage] = useState('')

  // Called when the form is submitted
  function handleSubmit(e) {
    e.preventDefault() // stops the page from reloading

    // Check that the required fields are filled
    if (name === '' || date === '' || time === '') {
      setMessage('Please fill name, date and time.')
      return
    }

    const reservation = {
      name: name,
      date: date,
      time: time,
      guests: guests,
      type: type,
      notes: notes,
    }
    addReservation(reservation)
    setMessage('Reservation sent! You will get a confirmation soon.')

    // Clear the form
    setName('')
    setDate('')
    setTime('')
    setGuests(2)
    setType('Table')
    setNotes('')
  }

  return (
    <div className="page">
      <h1>Reservations</h1>

      <form onSubmit={handleSubmit}>
        <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        <input type="number" min="1" value={guests} onChange={(e) => setGuests(e.target.value)} />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option>Table</option>
          <option>Birthday party</option>
          <option>Corporate event</option>
        </select>
        <input placeholder="Special requests (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} />
        <button type="submit">Book</button>
      </form>

      {message !== '' && <p className="success">{message}</p>}

      <h2>My Reservations</h2>
      {reservations.length === 0 ? (
        <p>No reservations yet.</p>
      ) : (
        reservations.map((r) => (
          <div className="card" key={r.id}>
            <p>{r.type} for {r.guests} guests</p>
            <p>{r.date} at {r.time} - {r.name}</p>
            <p>Status: {r.status}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default Reservations