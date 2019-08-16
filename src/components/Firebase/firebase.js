import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDP0JIFjXrx0TNUtsF2Q0XEPCxOGdiWfcc',
  authDomain: 'plant-logger-auth.firebaseapp.com',
  databaseURL: 'https://plant-logger-auth.firebaseio.com',
  projectId: 'plant-logger-auth',
  storageBucket: 'plant-logger-auth.appspot.com',
  messagingSenderId: '1064631907623',
  appId: '1:1064631907623:web:439e4dae8cb95ef7',
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
  }

  // *** Auth API ***

  createUser = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  signIn = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  signOut = () => this.auth.signOut();

  passwordReset = email => this.auth.sendPasswordResetEmail(email);

  passwordUpdate = password => this.auth.currentUser.updatePassword(password);

  currentUser = () => this.auth;
}

export default Firebase;
