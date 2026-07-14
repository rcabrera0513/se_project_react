import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onCardClick(item);
    }
  };

  return (
    <li
      className="card"
      onClick={() => onCardClick(item)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <h2 className="card__name">{item.name}</h2>
      <img className="card__image" src={item.link} alt={item.name} />
    </li>
  );
}

export default ItemCard;