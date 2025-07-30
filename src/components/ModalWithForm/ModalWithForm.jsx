import { useEffect } from "react";
import "./ModalWithForm.css";
import closeIcon from "../../assets/close.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  name,
  isButtonDisabled,
  onSubmit,
  additionalButtonText,
  onAdditionalButtonClick,
  hasError,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen]);

  return (
    <div className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__overlay" onClick={onClose}></div>
      <div
        className={`modal__container ${
          (name === "login-modal" || name === "signup-modal") && hasError
            ? "modal__container_error"
            : ""
        }`}
      >
        <h2 className="modal__title">{title}</h2>
        <button type="button" className="modal__close-button" onClick={onClose}>
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>
        <form className="modal__form" name={name} onSubmit={onSubmit}>
          {children}
          <div className="modal__button-container">
            <button
              type="submit"
              className="modal__button"
              disabled={isButtonDisabled}
            >
              {buttonText}
            </button>
            {additionalButtonText && (
              <span
                className="modal__additional-text"
                onClick={onAdditionalButtonClick}
                style={{
                  cursor: onAdditionalButtonClick ? "pointer" : "default",
                }}
              >
                {additionalButtonText}
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
