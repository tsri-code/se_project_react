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
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import LoginModal from "../LoginModal/LoginModal";
import SignUpModal from "../SignUpModal/SignUpModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

// Utility and API imports
import { getWeatherData, filterWeatherData } from "../../utils/weatherApi";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
  updateProfile,
} from "../../utils/api";
import { signup, signin, getUserInfo } from "../../utils/auth";

// Context imports
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

// CSS imports
import "./App.css";

function App() {
  // App state
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 0, C: 0 },
    city: "",
    time: "",
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  // Authentication state
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Modal state
  const [activeModal, setActiveModal] = useState("");

  // Modal handlers
  const handleAddGarment = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = (item) => {
    const token = localStorage.getItem("jwt");
    addItem(
      {
        name: item.name,
        imageUrl: item.imageUrl,
        weather: item.weatherType,
      },
      token
    )
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
    const token = localStorage.getItem("jwt");
    deleteItem(selectedCard._id, token)
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

  // Registration handler
  const handleRegistration = ({ name, avatar, email, password }) => {
    return signup({ name, avatar, email, password })
      .then((res) => {
        return signin({ email, password });
      })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return getUserInfo(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeActiveModal();
      });
  };

  const handleLogin = ({ email, password }) => {
    return signin({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return getUserInfo(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeActiveModal();
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser({});
    setIsLoggedIn(false);
  };

  const handleEditProfile = () => {
    setActiveModal("edit-profile");
  };

  const handleUpdateProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    updateProfile({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    (!isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        addCardLike(id, token)
      : // if not, send a request to remove the user's id from the card's likes array
        removeCardLike(id, token)
    )
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch((err) => console.log(err));
  };

  // Close modal on Escape key
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
        const processedWeatherData = filterWeatherData(data);
        setWeatherData(processedWeatherData);
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

  // Token validation on app load
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getUserInfo(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log("Token validation failed:", err);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, setCurrentTemperatureUnit }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddGarment={handleAddGarment}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              handleLogout={handleLogout}
              onLoginClick={() => setActiveModal("login")}
              onSignUpClick={() => setActiveModal("signup")}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleCardClick={handleCardClick}
                      handleAddGarment={handleAddGarment}
                      clothingItems={clothingItems}
                      onCardLike={handleCardLike}
                      onEditProfile={handleEditProfile}
                      onLogout={handleLogout}
                    />
                  </ProtectedRoute>
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
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onUpdateProfile={handleUpdateProfile}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={handleLogin}
            onSignUpClick={() => setActiveModal("signup")}
          />
          <SignUpModal
            isOpen={activeModal === "signup"}
            onClose={closeActiveModal}
            onSignUp={handleRegistration}
            onLoginClick={() => setActiveModal("login")}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
