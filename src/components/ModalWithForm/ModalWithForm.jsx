import { useEffect } from "react";
import "./ModalWithForm.css";
import closeIcon from "../../assets/close.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  onClose,
  name,
  isButtonDisabled,
}) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (activeModal === "add-garment") {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [activeModal, onClose]);

  return (
    <div
      className={`modal modal_type_${name} ${
        activeModal === "add-garment" ? "modal_opened" : ""
      }`}
    >
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="modal__container">
        <h2 className="modal__title">{title}</h2>
        <button type="button" className="modal__close-button" onClick={onClose}>
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>
        <form className="modal__form" name={name}>
          {children}
          <button
            type="submit"
            className="modal__button"
            disabled={isButtonDisabled}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
