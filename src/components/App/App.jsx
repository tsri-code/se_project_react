import { useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "cold" });
  const [selectedWeather, setSelectedWeather] = useState("");
  const [formData, setFormData] = useState({ name: "", imageUrl: "" });
  const [selectedCard, setSelectedCard] = useState({});

  const handleWeatherChange = (e) => {
    setSelectedWeather(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    formData.name.trim() !== "" ||
    formData.imageUrl.trim() !== "" ||
    selectedWeather !== "";

  const [activeModal, setActiveModal] = useState("");

  const handleAddGarment = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setFormData({ name: "", imageUrl: "" });
    setSelectedWeather("");
  };

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddGarment={handleAddGarment} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <Footer />
      </div>
      <ModalWithForm
        buttonText="Add garment"
        title="New Garment"
        activeModal={activeModal}
        onClose={closeActiveModal}
        name="add-garment"
        isButtonDisabled={!isFormValid}
      >
        <div className="modal__input-container">
          <label className="modal__label">
            Name
            <input
              type="text"
              className="modal__input"
              placeholder="Name"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor="imageURL" className="modal__label">
            Image
            <input
              type="text"
              className="modal__input"
              placeholder="Image URL"
              id="imageURL"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
            />
          </label>
          <fieldset className="modal__radio-fieldset">
            <legend className="modal__legend">Select the weather type:</legend>
            <label
              className="modal__radio-label"
              style={{
                opacity: selectedWeather && selectedWeather !== "hot" ? 0.5 : 1,
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
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        selectedCard={selectedCard}
        onClose={closeActiveModal}
      />
    </div>
  );
}

export default App;
