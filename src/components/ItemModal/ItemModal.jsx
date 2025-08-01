import { useContext } from "react";
import "./ItemModal.css";
import closeIcon from "../../assets/close-white.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function ItemModal({ activeModal, selectedCard, onClose, onDelete }) {
  const currentUser = useContext(CurrentUserContext);

  // Check item ownership
  const isOwn = selectedCard.owner === currentUser._id;

  return (
    <div
      className={`modal modal_type_${activeModal} ${
        activeModal === "preview" ? "modal_opened" : ""
      }`}
    >
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="modal__container_type_image">
        <button type="button" className="modal__close-button" onClick={onClose}>
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>
        <img
          src={selectedCard.imageUrl}
          alt={selectedCard.name}
          className="modal__image"
        />
        <div className="modal__footer">
          <p className="modal__name">{selectedCard.name}</p>
          <p className="modal__weather">Weather: {selectedCard.weather}</p>
          {isOwn && (
            <button className="modal__delete-button" onClick={onDelete}>
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
