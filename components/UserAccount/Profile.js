import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Footer from '../Footer';
import firebase from 'firebase/app';
import Notifications from '../Notifications/Notifications';
import { useHistory } from 'react-router-native';

export default function Profile(props) {
  var db = firebase.firestore();
  const history = useHistory();

  const handleLogOut = (event) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('successfully logged out');
        history.push(`/`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.profileContainer}>
      <Text style={styles.profileContainerTitle}>My Profile</Text>
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Information</Text>
        <TouchableOpacity style={styles.editInfoButton}>
          <Text>Edit Info</Text>
          <Feather name='edit' size={24} color='#2E5E4E' />
        </TouchableOpacity>
      </View>
      <Notifications />
      <View style={styles.logOut}>
        <Feather name='log-out' size={25} color='#5B443E' />
        <Text onPress={handleLogOut}>Log Out</Text>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: '100%',
  },
  profileContainerTitle: {
    marginTop: 40,
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E5E4E',
    fontSize: 25,
  },
  infoSection: {
    marginLeft: 20,
  },
  infoTitle: {
    marginTop: 40,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E5E4E',
    fontSize: 18,
  },

  editInfoButton: {
    display: 'flex',
    flexDirection: 'row',
  },
  logOut: {
    marginLeft: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 80,
    right: 20,
  },
});
