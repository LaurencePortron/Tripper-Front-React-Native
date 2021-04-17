import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeRouter, Redirect, Route } from 'react-router-native';
import LogIn from './components/Logins/LogIn';
import TripDetails from './components/Trips/TripDetails';
import Dashboard from './components/Trips/Dashboard';
import { UserContext } from './context/Context';
import AddTrip from './components/Trips/AddTrip';
import AddActivity from './components/Activities/AddActivity';
import SignUp from './components/Logins/SignUp';
import Messages from './components/Messages/Messages';
import Profile from './components/UserAccount/Profile';

import HelpCenter from './components/Faq/HelpCenter';
import firebase from 'firebase/app';
import 'firebase/firestore';

import About from './components/AboutMe/About';
import WelcomePage from './components/Logins/WelcomePage';
import TripOverview from './components/Trips/TripOverview';
import CustomExpenses from './components/Splitwise/CustomExpenses';

const firebaseConfig = {
  apiKey: 'AIzaSyBtMHUYG7yzkUhuqG6SlE5m75GQhh6qG00',
  authDomain: 'tripper-2df47.firebaseapp.com',
  databaseURL: 'https://tripper-2df47-default-rtdb.firebaseio.com',
  projectId: 'tripper-2df47',
  storageBucket: 'tripper-2df47.appspot.com',
  messagingSenderId: '685545529901',
  appId: '1:685545529901:web:3e4ebf5c6efeb079f1cea4',
  measurementId: 'G-RGTTETJ5MQ',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <UserContext.Provider value={user}>
      <NativeRouter>
        <View style={styles.container}>
          {user ? (
            <Redirect from='/' to='/dashboard' />
          ) : (
            <Route exact path='/login' component={LogIn} />
          )}
          <Route exact path='/' component={WelcomePage} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route path='/trip-details/:id' component={TripDetails} />
          <Route path='/add-trip' component={AddTrip} />
          <Route path='/add-activities/:id' component={AddActivity} />

          <Route path='/myprofile' component={Profile} />

          <Route path='/messages' component={Messages} />
          <Route path='/helpCenter' component={HelpCenter} />
          <Route path='/about' component={About} />
          <Route path='/trip-overview/:id' component={TripOverview} />
          <Route path='/custom-expenses/:id' component={CustomExpenses} />
        </View>
      </NativeRouter>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
});
