import { useState } from "react";
import "./ModalWithForm.css";
import closeIcon from "../../assets/close.svg";

function ModalWithForm() {
  const [selectedWeather, setSelectedWeather] = useState("");

  const handleWeatherChange = (e) => {
    setSelectedWeather(e.target.value);
  };

  return (
    <div className="modal">
      <div className="modal__container">
        <h2 className="modal__title">New Garment</h2>
        <button type="button" className="modal__close-button">
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>
        <form className="modal__form">
          <div className="modal__input-container">
            <label className="modal__label">
              Name
              <input
                type="text"
                className="modal__input"
                placeholder="Name"
                id="name"
              />
            </label>
            <label htmlFor="imageURL" className="modal__label">
              Image
              <input
                type="text"
                className="modal__input"
                placeholder="Image URL"
                id="imageURL"
              />
            </label>
            <fieldset className="modal__radio-fieldset">
              <legend className="modal__legend">
                Select the weather type:
              </legend>
              <label
                className="modal__radio-label"
                style={{
                  opacity:
                    selectedWeather && selectedWeather !== "hot" ? 0.5 : 1,
                }}
              >
                <input
                  type="radio"
                  name="weatherType"
                  value="hot"
                  className="modal__radio"
                  id="hot"
                  onChange={handleWeatherChange}
                />
                Hot
              </label>
              <label
                className="modal__radio-label"
                style={{
                  opacity:
                    selectedWeather && selectedWeather !== "warm" ? 0.5 : 1,
                }}
              >
                <input
                  type="radio"
                  name="weatherType"
                  value="warm"
                  className="modal__radio"
                  id="warm"
                  onChange={handleWeatherChange}
                />
                Warm
              </label>
              <label
                className="modal__radio-label"
                style={{
                  opacity:
                    selectedWeather && selectedWeather !== "cold" ? 0.5 : 1,
                }}
              >
                <input
                  type="radio"
                  name="weatherType"
                  value="cold"
                  className="modal__radio"
                  id="cold"
                  onChange={handleWeatherChange}
                />
                Cold
              </label>
            </fieldset>
          </div>
          <button type="submit" className="modal__button">
            Add garment
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
