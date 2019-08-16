import React from 'react';
import withFirebaseUser from './withFirebaseUser';
import Firebase from './firebase';

const FirebaseContext = React.createContext(null);

export default Firebase;

export { FirebaseContext, withFirebaseUser };
