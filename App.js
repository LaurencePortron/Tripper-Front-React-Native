import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeRouter, Route } from 'react-router-native';
import LogIn from './components/LogIn';
import Dashboard from './components/Dashboard';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <NativeRouter>
        <View style={styles.container}>
          <Route exact path='/' component={LogIn} />
          <Route exact path='/dashboard' component={Dashboard} />
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
