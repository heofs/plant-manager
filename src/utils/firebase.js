import * as firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDP0JIFjXrx0TNUtsF2Q0XEPCxOGdiWfcc',
  authDomain: 'plant-logger-auth.firebaseapp.com',
  databaseURL: 'https://plant-logger-auth.firebaseio.com',
  projectId: 'plant-logger-auth',
  storageBucket: 'plant-logger-auth.appspot.com',
  messagingSenderId: '1064631907623',
  appId: '1:1064631907623:web:439e4dae8cb95ef7',
};

firebase.initializeApp(firebaseConfig);

export const googleProvider = new firebase.auth.GoogleAuthProvider();

export default firebase;
