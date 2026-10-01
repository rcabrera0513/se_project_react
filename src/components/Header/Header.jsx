import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/avatar.svg";
import { Link, NavLink } from "react-router-dom";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <NavLink to="/" end className="header__home-link">
        <div className="header__left">
          <img className="header__logo" src={logo} alt="wtwr logo" />
          <p className="header__date-and-location">
            {currentDate}, {weatherData.city}
          </p>
        </div>
      </NavLink>

      <div className="header__right">
        <div className="header__actions">
          <ToggleSwitch />
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
        </div>

        <Link to="/profile" className="header__user-container">
          <p className="header__user-name">Terrence Tegegne</p>
          <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
        </Link>
      </div>
    </header>
  );
}

export default Header;