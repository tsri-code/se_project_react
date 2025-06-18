import { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeatherData, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  // setting up all the state we need for the app
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 0, C: 0 },
    city: "",
    time: "",
  });
  const [selectedWeather, setSelectedWeather] = useState("");
  const [formData, setFormData] = useState({ name: "", imageUrl: "" });
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  // handle temperature unit toggle
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  // handle when user picks a weather type in the form
  const handleWeatherChange = (e) => {
    setSelectedWeather(e.target.value);
  };

  // handle when user types in the form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // check if the form has any content to enable/disable submit button
  const isFormValid =
    formData.name.trim() !== "" ||
    formData.imageUrl.trim() !== "" ||
    selectedWeather !== "";

  // modal state management
  const [activeModal, setActiveModal] = useState("");

  // open the add garment modal when + Add Clothes button is clicked
  const handleAddGarment = () => {
    setActiveModal("add-garment");
  };

  // open the item modal when a card is clicked
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  // close any open modal and reset form data
  const closeActiveModal = () => {
    setActiveModal("");
    setFormData({ name: "", imageUrl: "" });
    setSelectedWeather("");
  };

  // escape key listener to close modals
  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    getWeatherData()
      .then((data) => {
        setWeatherData(filterWeatherData(data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, setCurrentTemperatureUnit }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            handleAddGarment={handleAddGarment}
            weatherData={weatherData}
            handleToggleSwitchChange={handleToggleSwitchChange}
          />
          <Main weatherData={weatherData} handleCardClick={handleCardClick} />
          <Footer />
        </div>
        <ModalWithForm
          buttonText="Add garment"
          title="New Garment"
          isOpen={activeModal === "add-garment"}
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
        </ModalWithForm>
        <ItemModal
          activeModal={activeModal}
          selectedCard={selectedCard}
          onClose={closeActiveModal}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
