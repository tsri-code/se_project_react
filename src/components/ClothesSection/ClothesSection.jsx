import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ handleCardClick, handleAddGarment, clothingItems }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__title">
        <p className="clothes-section__title-text">Your items</p>
        <button className="clothes-section__button" onClick={handleAddGarment}>
          + Add New
        </button>
      </div>
      <ul className="clothes-section__cards-list">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={handleCardClick} />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
