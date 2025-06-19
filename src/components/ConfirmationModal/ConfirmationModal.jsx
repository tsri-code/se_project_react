import "./ConfirmationModal.css";
import closeIcon from "../../assets/close.svg";

function ConfirmationModal({ isOpen, onClose, onConfirm }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="modal__container modal__container_type_confirmation">
        <button type="button" className="modal__close-button" onClick={onClose}>
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>
        <div className="modal__content">
          <h2 className="modal__confirmation-title">
            Are you sure you want to delete this item? This action is
            irreversible.
          </h2>
          <div className="modal__confirmation-buttons">
            <button
              className="modal__confirmation-button modal__confirmation-button_type_delete"
              onClick={onConfirm}
            >
              Yes, delete item
            </button>
            <button
              className="modal__confirmation-button modal__confirmation-button_type_cancel"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
