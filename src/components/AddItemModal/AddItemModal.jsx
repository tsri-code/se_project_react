import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ isOpen, onClose, onAddItemModalSubmit }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weatherType, setWeatherType] = useState("");

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
      setWeatherType("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit({
      name,
      imageUrl,
      weatherType,
    });
    setName("");
    setImageUrl("");
    setWeatherType("");
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWeatherTypeChange = (e) => {
    setWeatherType(e.target.value);
  };

  // Check if form is valid
  const isFormValid =
    name.trim() !== "" && imageUrl.trim() !== "" && weatherType !== "";

  return (
    <ModalWithForm
      buttonText="Add garment"
      title="New Garment"
      isOpen={isOpen}
      onClose={onClose}
      name="add-garment"
      isButtonDisabled={!isFormValid}
      onSubmit={handleSubmit}
    >
      <div className="modal__input-container">
        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            className="modal__input"
            placeholder="Name"
            id="name"
            name="name"
            minLength="1"
            maxLength="30"
            required
            value={name}
            onChange={handleNameChange}
          />
        </label>
        <label htmlFor="imageURL" className="modal__label">
          Image
          <input
            type="url"
            className="modal__input"
            placeholder="Image URL"
            id="imageURL"
            name="imageUrl"
            value={imageUrl}
            required
            onChange={handleImageUrlChange}
          />
        </label>
        <fieldset className="modal__radio-fieldset">
          <legend className="modal__legend">Select the weather type:</legend>
          <label
            htmlFor="hot"
            className={`modal__radio-label ${
              weatherType && weatherType !== "hot"
                ? "modal__radio-label_faded"
                : ""
            }`}
          >
            <input
              type="radio"
              name="weatherType"
              value="hot"
              className="modal__radio"
              id="hot"
              checked={weatherType === "hot"}
              onChange={handleWeatherTypeChange}
            />
            Hot
          </label>
          <label
            htmlFor="warm"
            className={`modal__radio-label ${
              weatherType && weatherType !== "warm"
                ? "modal__radio-label_faded"
                : ""
            }`}
          >
            <input
              type="radio"
              name="weatherType"
              value="warm"
              className="modal__radio"
              id="warm"
              checked={weatherType === "warm"}
              onChange={handleWeatherTypeChange}
            />
            Warm
          </label>
          <label
            htmlFor="cold"
            className={`modal__radio-label ${
              weatherType && weatherType !== "cold"
                ? "modal__radio-label_faded"
                : ""
            }`}
          >
            <input
              type="radio"
              name="weatherType"
              value="cold"
              className="modal__radio"
              id="cold"
              checked={weatherType === "cold"}
              onChange={handleWeatherTypeChange}
            />
            Cold
          </label>
        </fieldset>
      </div>
    </ModalWithForm>
  );
}

export default AddItemModal;
