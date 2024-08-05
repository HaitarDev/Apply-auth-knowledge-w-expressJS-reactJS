import { useContext } from "react";
import { AuthContext } from "../context/authContext";

function UserPage() {
  const { logout } = useContext(AuthContext);
  return (
    <div>
      PROTECTED PAGE
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}

export default UserPage;
