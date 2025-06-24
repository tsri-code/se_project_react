// React and external library imports
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Component imports
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

// Utility and API imports
import { getWeatherData, filterWeatherData } from "../../utils/weatherApi";
import { getItems, addItem, deleteItem } from "../../utils/api";

// Context imports
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

// CSS imports
import "./App.css";

function App() {
  // setting up all the state we need for the app
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 0, C: 0 },
    city: "",
    time: "",
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

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

  // close any open modal
  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = (item) => {
    addItem({
      name: item.name,
      imageUrl: item.imageUrl,
      weather: item.weatherType,
    })
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteItem = () => {
    setActiveModal("delete-confirmation");
  };

  const handleDeleteConfirm = () => {
    deleteItem(selectedCard._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== selectedCard._id)
        );
        closeActiveModal();
      })
      .catch((err) => {
        console.log(err);
      });
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

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
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
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  handleCardClick={handleCardClick}
                  handleAddGarment={handleAddGarment}
                  clothingItems={clothingItems}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          onAddItemModalSubmit={handleAddItemModalSubmit}
        />
        <ItemModal
          activeModal={activeModal}
          selectedCard={selectedCard}
          onClose={closeActiveModal}
          onDelete={handleDeleteItem}
        />
        <ConfirmationModal
          isOpen={activeModal === "delete-confirmation"}
          onClose={closeActiveModal}
          onConfirm={handleDeleteConfirm}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
