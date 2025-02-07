import { createContext, useContext, useState, useEffect } from "react";
import { getProfile, logoutUser } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getProfile();
        console.log("data", data);
        setUser(data.user);
      } catch {
        logoutUser();
      }
    };
    if (token) fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logoutUser, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
