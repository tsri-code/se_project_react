import { useContext } from "react";
import { Navigate } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function ProtectedRoute({ children, isLoggedIn }) {
  return isLoggedIn ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;
