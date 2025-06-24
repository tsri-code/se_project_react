import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/main-logo.svg";
import user from "../../assets/user-logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddGarment, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

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
        <ToggleSwitch />
        <button
          onClick={handleAddGarment}
          type="button"
          className="header__button"
        >
          + Add Clothes
        </button>
        <Link to="/profile" className="header__user-container">
          <p className="header__user-name">Terence Tegegne</p>
          <img src={user} alt="Terence Tegegne" className="header__avatar" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
