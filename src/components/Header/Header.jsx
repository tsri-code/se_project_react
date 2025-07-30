import { Link } from "react-router-dom";
import { useContext } from "react";
import "./Header.css";
import logo from "../../assets/main-logo.svg";
import user from "../../assets/user-logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddGarment,
  weatherData,
  isLoggedIn,
  handleLogout,
  onLoginClick,
  onSignUpClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  // Avatar placeholder
  const avatarPlaceholder = currentUser?.name
    ? currentUser.name[0].toUpperCase()
    : "U";

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">
          <img src={logo} alt="Logo" className="header__logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__right">
        {isLoggedIn ? (
          <>
            <ToggleSwitch />
            <button
              onClick={handleAddGarment}
              type="button"
              className="header__button"
            >
              + Add Clothes
            </button>
            <Link to="/profile" className="header__user-container">
              <p className="header__user-name">{currentUser?.name}</p>
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">
                  {avatarPlaceholder}
                </div>
              )}
            </Link>
          </>
        ) : (
          <div className="header__auth-container">
            <ToggleSwitch />
            <button
              type="button"
              className="header__auth-button"
              onClick={onSignUpClick}
            >
              Sign Up
            </button>
            <button
              type="button"
              className="header__auth-button"
              onClick={onLoginClick}
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
