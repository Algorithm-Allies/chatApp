import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Check if user data is stored in localStorage
  const storedUser = JSON.parse(localStorage.getItem('user'));

  const [user, setUser] = useState(storedUser || null);

  const login = (userData) => {
    setUser(userData);
    // Store the user data in localStorage for persistent login
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    // Clear the user data from localStorage
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
