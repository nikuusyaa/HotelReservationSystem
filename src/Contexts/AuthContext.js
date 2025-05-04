import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext({
  response: null,
  setResponse: () => {},
});

export function AuthProvider({ children }) {
  const [response, setResponse] = useState(null);

  return (
    <AuthContext.Provider value={{ response, setResponse }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
