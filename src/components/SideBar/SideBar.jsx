import profilePicture from "../../assets/user-logo.svg";
import "./SideBar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <img src={profilePicture} alt="User logo" className="sidebar__avatar" />
      <p className="sidebar__name">Terence Tegegne</p>
    </div>
  );
}

export default SideBar;
