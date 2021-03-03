import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeRouter, Redirect, Route } from 'react-router-native';
import LogIn from './components/LogIn';
import TripDetails from './components/TripDetails';
import Dashboard from './components/Dashboard';
import { NavigationContainer } from '@react-navigation/native';
import { UserContext } from './context/Context';
import AddTrip from './components/AddTrip';
import AddActivity from './components/AddActivity';
import SignUp from './components/SignUp';
import Messages from './components/Messages';
import Profile from './components/Profile';
import AccountSettings from './components/AccountSettings';
import HelpCenter from './components/HelpCenter';
import firebase from 'firebase/app';
import 'firebase/firestore';
import NotificationSettings from './components/NotificationSettings';

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
      console.log('user changed', user);
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
            <Route exact path='/' component={LogIn} />
          )}
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route path='/trip-details/:id' component={TripDetails} />
          <Route path='/add-trip' component={AddTrip} />
          <Route path='/add-activities/:id' component={AddActivity} />
          <Route path='/settings' component={AccountSettings} />
          <Route path='/myprofile' component={Profile} />
          <Route path='/notifications' component={NotificationSettings} />
          <Route path='/messages' component={Messages} />
          <Route path='/helpCenter' component={HelpCenter} />
        </View>
      </NativeRouter>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
