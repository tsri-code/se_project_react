import { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  handleCardClick,
  handleAddGarment,
  clothingItems,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  // Filter user's items
  const userClothingItems = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__title">
        <p className="clothes-section__title-text">Your items</p>
        <button className="clothes-section__button" onClick={handleAddGarment}>
          + Add New
        </button>
      </div>
      <ul className="clothes-section__cards-list">
        {userClothingItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={handleCardClick}
            onCardLike={onCardLike}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
