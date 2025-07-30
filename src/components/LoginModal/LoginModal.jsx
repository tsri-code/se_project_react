import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onLogin, onSignUpClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Only submit if both email and password are provided
    if (isValidEmail(email) && password.trim()) {
      setErrorMessage(""); // Clear any previous errors
      onLogin({ email, password }).catch(() => {
        setErrorMessage("Email or password incorrect");
      });
    }
  };

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setErrorMessage("");
    }
  }, [isOpen]);

  // Clear error when user starts typing
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errorMessage) setErrorMessage("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errorMessage) setErrorMessage("");
  };

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Button is enabled when valid email is entered (password not required for enabling)
  const isButtonDisabled = !isValidEmail(email);

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      additionalButtonText="or Sign Up"
      onAdditionalButtonClick={onSignUpClick}
      name="login-modal"
      isButtonDisabled={isButtonDisabled}
      hasError={!!errorMessage}
    >
      <div className="login-modal__input-field">
        <label htmlFor="email" className="modal__label">
          Email
        </label>
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>

      <div className="login-modal__input-field">
        <label htmlFor="password" className="modal__label">
          Password
        </label>
        <input
          type="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>

      {errorMessage && (
        <div className="login-modal__error-message">{errorMessage}</div>
      )}
    </ModalWithForm>
  );
}

export default LoginModal;
