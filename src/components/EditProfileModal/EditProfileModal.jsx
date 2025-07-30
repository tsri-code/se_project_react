import { useState, useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./EditProfileModal.css";

function EditProfileModal({ isOpen, onClose, onUpdateProfile }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  // Pre-fill form with user data
  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [isOpen, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile({ name, avatar });
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="edit-profile"
    >
      <div className="modal__input-field">
        <label htmlFor="profile-name" className="modal__label">
          Name *
        </label>
        <input
          type="text"
          className="modal__input"
          id="profile-name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="modal__input-field">
        <label htmlFor="profile-avatar" className="modal__label">
          Avatar *
        </label>
        <input
          type="url"
          className="modal__input"
          id="profile-avatar"
          placeholder="Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          required
        />
      </div>
    </ModalWithForm>
  );
}

export default EditProfileModal;
