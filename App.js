import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route, Link } from 'react-router-native';
import LogIn from './components/LogIn';
import Dashboard from './components/Dashboard';

export default function App() {
  return (
    <NativeRouter>
      <View style={styles.container}>
        <Route exact path='/' component={LogIn} />
        <Route exact path='/dashboard' component={Dashboard} />
      </View>
    </NativeRouter>
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
