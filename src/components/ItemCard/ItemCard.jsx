import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    const isLiked = item.likes.some((id) => id === currentUser._id);
    onCardLike({ id: item._id, isLiked });
  };

  // Like status and styling
  const isLiked = item.likes && item.likes.some((id) => id === currentUser._id);
  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  return (
    <li className="card">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
        onClick={handleCardClick}
      />
      <div className="card__header">
        <h2 className="card__title">{item.name}</h2>
        {currentUser._id && (
          <button
            className={itemLikeButtonClassName}
            onClick={handleLike}
            type="button"
          >
            <svg
              width="18"
              height="15"
              viewBox="0 0 18 16"
              fill={isLiked ? "#ff0000" : "none"}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 14.5L7.65 13.3C3.6 9.775 1.125 7.6 1.125 4.9C1.125 2.725 2.85 1 5.025 1C6.225 1 7.375 1.6 9 2.575C10.625 1.6 11.775 1 12.975 1C15.15 1 16.875 2.725 16.875 4.9C16.875 7.6 14.4 9.775 10.35 13.3L9 14.5Z"
                stroke={isLiked ? "none" : "rgba(0, 0, 0, 0.6)"}
                strokeWidth="2"
              />
            </svg>
          </button>
        )}
      </div>
    </li>
  );
}

export default ItemCard;
