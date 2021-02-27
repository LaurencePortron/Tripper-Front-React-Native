import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeRouter, Route } from 'react-router-native';
import LogIn from './components/LogIn';
import TripDetails from './components/TripDetails';
import Dashboard from './components/Dashboard';
import { NavigationContainer } from '@react-navigation/native';
import AddTrip from './components/AddTrip';

export default function App() {
  return (
    <NavigationContainer>
      <NativeRouter>
        <View style={styles.container}>
          <Route exact path='/' component={LogIn} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route path='/trip-details/:id' component={TripDetails} />
          <Route path='/add-trip' component={AddTrip} />
        </View>
      </NativeRouter>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
