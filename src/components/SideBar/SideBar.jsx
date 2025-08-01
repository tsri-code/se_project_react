import { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function SideBar({ onEditProfile, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  // Avatar placeholder
  const avatarPlaceholder = currentUser?.name
    ? currentUser.name[0].toUpperCase()
    : "U";

  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="sidebar__avatar"
          />
        ) : (
          <div className="sidebar__avatar-placeholder">{avatarPlaceholder}</div>
        )}
        <p className="sidebar__name">{currentUser?.name}</p>
      </div>
      <div className="sidebar__actions">
        <button
          className="sidebar__action-link"
          type="button"
          onClick={onEditProfile}
        >
          Change profile data
        </button>
        <button
          className="sidebar__action-link sidebar__logout-link"
          type="button"
          onClick={onLogout}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
