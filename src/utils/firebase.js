import app from 'firebase/app';
import 'firebase/auth';

const provider = new app.auth.GoogleAuthProvider();

const firebaseConfig = {
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
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
  }
  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  logout() {
    return this.auth.signOut();
  }
  register = async (name, email, password) => {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({ displayName: name });
  };
  onAuthStateChanged() {
    return this.auth.onAuthStateChanged;
  }
  rememberLogin() {
    return this.auth.setPersistence(app.auth.Auth.Persistence.LOCAL);
  }
  googleLogin() {
    return this.auth.signInWithPopup(provider);
  }
  isInitialized() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve);
    });
  }
}

export default new Firebase();
