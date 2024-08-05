import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedAuthRoutes() {
  const { user } = useContext(AuthContext);

  return user?.isAuth ? <Navigate to="/user" /> : <Outlet />;
}

export default ProtectedAuthRoutes;
