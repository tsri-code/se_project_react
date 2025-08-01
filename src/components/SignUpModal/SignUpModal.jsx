import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { isValidEmail } from "../../utils/validation";
import "./SignUpModal.css";

function SignUpModal({ isOpen, onClose, onSignUp, onLoginClick }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Only submit if all required fields are provided
    if (
      isValidEmail(email) &&
      password.trim() &&
      name.trim() &&
      avatar.trim()
    ) {
      setErrorMessage(""); // Clear any previous errors
      onSignUp({ name, avatar, email, password }).catch(() => {
        setErrorMessage("Registration failed. Please try again.");
      });
    }
  };

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setName("");
      setAvatar("");
      setEmail("");
      setPassword("");
      setErrorMessage("");
    }
  }, [isOpen]);

  // Clear error when user starts typing
  const handleNameChange = (e) => {
    setName(e.target.value);
    if (errorMessage) setErrorMessage("");
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
    if (errorMessage) setErrorMessage("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errorMessage) setErrorMessage("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errorMessage) setErrorMessage("");
  };

  // Button is enabled when all required fields are entered
  const isButtonDisabled =
    !isValidEmail(email) || !name.trim() || !password.trim() || !avatar.trim();

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      additionalButtonText="or Log In"
      onAdditionalButtonClick={onLoginClick}
      name="signup-modal"
      isButtonDisabled={isButtonDisabled}
      hasError={!!errorMessage}
    >
      <div className="signup-modal__input-field">
        <label htmlFor="signup-email" className="modal__label">
          Email*
        </label>
        <input
          type="email"
          className="modal__input"
          id="signup-email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>

      <div className="signup-modal__input-field">
        <label htmlFor="signup-password" className="modal__label">
          Password*
        </label>
        <input
          type="password"
          className="modal__input"
          id="signup-password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>

      <div className="signup-modal__input-field">
        <label htmlFor="signup-name" className="modal__label">
          Name*
        </label>
        <input
          type="text"
          className="modal__input"
          id="signup-name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </div>

      <div className="signup-modal__input-field signup-modal__input-field--avatar">
        <label htmlFor="signup-avatar" className="modal__label">
          Avatar URL *
        </label>
        <input
          type="url"
          className="modal__input"
          id="signup-avatar"
          placeholder="Avatar URL"
          value={avatar}
          onChange={handleAvatarChange}
          required
        />
      </div>

      {errorMessage && (
        <div className="signup-modal__error-message">{errorMessage}</div>
      )}
    </ModalWithForm>
  );
}

export default SignUpModal;
