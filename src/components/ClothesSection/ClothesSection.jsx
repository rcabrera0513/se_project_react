import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

export default function ClothesSection({ 
    clothingItems,
    onCardClick,
    handleAddClick
}) {
    return (
        <div className="clothes-section">
            <div className="clothes-section__row">
            <p>Your items</p>
            <button
                onClick={handleAddClick}
                type="button"
                className="clothes-section__add-clothes-btn">
            + Add new
          </button>
        </div>
        <ul className="clothes-section__items">
          {clothingItems.map((filteredCard) => (
            <ItemCard 
              key={filteredCard._id} 
              item={filteredCard} 
              onCardClick={onCardClick} />
        ))}
        </ul>
    </div>
    );
}