import React, { createContext, useState, useEffect } from 'react';
import firebase from './firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  // const [isLoading, setLoading] = useState(true);
  const setUser = user => {
    console.log(user);
    console.log(user.uid);
    setCurrentUser({
      uid: user.uid,
      displayName: user.displayName,
      token: user.ra,
      refreshToken: user.refreshToken,
    });
  };
  const login = async (email, password) => {
    return firebase
      .login(email, password)
      .then(res => {
        const user = res.user;
        setUser(user);
        console.log(res);
        // setUser({ ...res.user });
      })
      .catch(e => e.code);
  };
  const rememberLogin = (email, password) => {
    firebase
      .rememberLogin()
      .then(() => {
        console.log('Persisted login');
        login(email, password);
      })
      .catch(error => {
        console.log(error.message);
      });
  };
  const logout = async () => {
    await firebase
      .logout()
      .then(() => {
        console.log('Sign out successfull.');
        setCurrentUser(null);
        window.location.href = '/login';
      })
      .catch(error => {
        console.log(error.message);
      });
  };
  const googleLogin = () => {
    firebase
      .googleLogin()
      .then(result => {
        console.log(result.credential.accessToken);
        setUser(result.user);
      })
      .catch(error => {
        console.log(error.message);
      });
  };
  const getUser = () => {
    return firebase.isInitialized();
  };
  const register = (name, email, password) => {
    return firebase.register(name, email, password);
  };
  useEffect(() => {
    firebase.isInitialized().then(user => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        getUser,
        login,
        logout,
        rememberLogin,
        googleLogin,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const withAuthentication = Component => () => {
  return (
    <AuthContext.Consumer>
      {({
        currentUser,
        getUser,
        login,
        logout,
        rememberLogin,
        googleLogin,
        register,
      }) => (
        <Component
          currentUser={currentUser}
          login={login}
          logout={logout}
          rememberLogin={rememberLogin}
          googleLogin={googleLogin}
          getUser={getUser}
          register={register}
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
