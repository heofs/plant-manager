import React, { createContext, useState, useEffect } from 'react';

import firebase from './firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const login = (email, password) => {
    firebase.login(email, password).then(res => {
      const user = res.user;
      setCurrentUser({
        uid: user.uid,
        displayName: user.displayName,
        token: user.ra,
        refreshToken: user.refreshToken,
      });
    });
  };
  const rememberLogin = (email, password) => {
    firebase
      .rememberLogin()
      .then(() => {
        console.log('Signing in');
        //   return firebase.auth().signInWithEmailAndPassword(email, password);
      })
      .catch(error => {
        console.log(error.message);
      });
  };
  const logout = () => {
    console.log(currentUser);
  };
  useEffect(() => {
    firebase.onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        setCurrentUser(user);
      } else {
        console.log('No user');
        setCurrentUser(null);
      }
    });
  });
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        rememberLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const withAuthentication = Component => () => {
  return (
    <AuthContext.Consumer>
      {({ currentUser, login, logout, rememberLogin }) => (
        <Component
          currentUser={currentUser}
          login={login}
          logout={logout}
          rememberLogin={rememberLogin}
        />
      )}
    </AuthContext.Consumer>
  );
};

export const withCurrentUser = Component => () => {
  return (
    <AuthContext.Consumer>
      {({ currentUser, logout }) => (
        <Component currentUser={currentUser} logout={logout} />
      )}
    </AuthContext.Consumer>
  );
};
