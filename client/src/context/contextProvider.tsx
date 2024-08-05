import { ReactNode, useEffect, useState } from "react";
import { AuthContext, IUser } from "./authContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  console.log(user);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  function login(userData: IUser) {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  }

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // function getUser() {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
