import React, { createContext, useState, useEffect } from 'react';
import * as firebase from 'firebase/app';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const login = () => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
      } else {
        // No user is signed in.
      }
    });
    setAuthenticated(true);
  };
  const logout = () => {
    console.log(isAuthenticated);
    setAuthenticated(false);
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const withAuthentication = () => Component => {
  return (
    <AuthContext.Consumer>
      {({ currentUser, isAuthenticated, login, logout }) => (
        <Component
          currentUser={currentUser}
          isAuthenticated={isAuthenticated}
          login={login}
          logout={logout}
        />
      )}
    </AuthContext.Consumer>
  );
};

export default withAuthentication;
