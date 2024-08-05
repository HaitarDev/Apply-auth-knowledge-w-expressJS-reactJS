import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { user } = useContext(AuthContext);
  console.log(user);

  return user?.isAuth ? <Outlet /> : <Navigate to={"/"} />;
}

export default ProtectedRoute;
