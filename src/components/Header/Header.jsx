import "./Header.css";
import logo from "../../assets/main-logo.svg";
import user from "../../assets/user-logo.svg";

function Header({ handleAddGarment, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <img src={logo} alt="Logo" className="header__logo" />
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__right">
        <button
          onClick={handleAddGarment}
          type="button"
          className="header__button"
        >
          + Add Clothes
        </button>
        <div className="header__user-container">
          <p className="header__user-name">Terence Tegegne</p>
          <img src={user} alt="Terence Tegegne" className="header__avatar" />
        </div>
      </div>
    </header>
  );
}

export default Header;
