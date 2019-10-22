import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/layout/Header';
import User from './components/User';
import Routes from './Routes';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCAWmzjZ530vF3KzanUq00anxRH1FZ4pSc",
  authDomain: "chat-app-1bb7c.firebaseapp.com",
  databaseURL: "https://chat-app-1bb7c.firebaseio.com",
  projectId: "chat-app-1bb7c",
  storageBucket: "chat-app-1bb7c.appspot.com",
  messagingSenderId: "486931212123",
  appId: "1:486931212123:web:eb796556091c91a1495c7e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState(null);

  const onLogout = () => {
    setUser(null);
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(response => {
      if(response) {

        // leer los datos del usuario
        firebase.database().ref(`/users/${response.uid}`)
        .once('value')
        .then(snapshot => {
          setUser(snapshot.val());
        });
      }
    });
  }, []);

  return (
    <Router>
      <CssBaseline />
      <Header>
        {user && <User user={user} onLogout={onLogout} />}
      </Header>
      <Routes  />
    </Router>
  );
}

export default App;
