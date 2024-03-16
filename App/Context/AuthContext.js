import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading,setloading] = useState(false);
  const [user, setUser] = useState({}); 

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn,isLoading,setloading,user,setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);