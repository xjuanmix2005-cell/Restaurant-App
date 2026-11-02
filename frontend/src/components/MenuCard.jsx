// This component shows one dish. The data comes in through props
function MenuCard(props) {
  const item = props.item

  return (
    <div className="card">
      <h3>{item.name}</h3>
      <small>{item.category}</small>
      <p>{item.description}</p>
      <p>Ingredients: {item.ingredients}</p>
      {item.dietary !== 'none' && <p>Diet: {item.dietary}</p>}
      <strong>${item.price.toFixed(2)}</strong>
      <br />
      {/* Only show the button if the parent sent the onAdd function */}
      {props.onAdd && (
        <button disabled={!item.available} onClick={() => props.onAdd(item)}>
          {item.available ? 'Add to cart' : 'Not available'}
        </button>
      )}
    </div>
  )
}

export default MenuCard