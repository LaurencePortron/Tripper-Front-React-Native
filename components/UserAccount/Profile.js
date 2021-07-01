import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Footer from '../Footer';
import firebase from 'firebase/app';
import Notifications from '../Notifications/Notifications';
import { useHistory } from 'react-router-native';
import { useFirestoreDocument } from '../hooks';

export default function Profile(props) {
  var db = firebase.firestore();
  const history = useHistory();
  const user = firebase.auth().currentUser;
  const userId = user.uid;

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

  const getCurrentLoggedUser = useFirestoreDocument(
    firebase.firestore().collection('accounts').doc(userId),
    [userId]
  );

  if (!getCurrentLoggedUser) {
    return null;
  }

  console.log(getCurrentLoggedUser);

  return (
    <View style={styles.profileContainer}>
      <Image
        source={require('../images/login.jpg')}
        style={styles.profileImage}
        alt='random'
      ></Image>
      <View style={styles.profileSection}>
        <Text style={styles.profileContainerTitle}>My Profile</Text>
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Information</Text>
          <View style={styles.infoEmail}>
            <Text style={styles.infoEmailTitle}>Username</Text>
            {getCurrentLoggedUser ? (
              <Text style={styles.userEmail}>
                {getCurrentLoggedUser.data.userName}
              </Text>
            ) : null}
          </View>
          <View style={styles.infoEmail}>
            <Text style={styles.infoEmailTitle}>Email</Text>
            {getCurrentLoggedUser ? (
              <Text style={styles.userEmail}>
                {getCurrentLoggedUser.data.email}
              </Text>
            ) : null}
          </View>

          <View style={styles.infoEmail}>
            <Text style={styles.infoEmailTitle}>Password</Text>
            {getCurrentLoggedUser ? (
              <Text style={styles.userEmail}>
                {getCurrentLoggedUser.data.password}
              </Text>
            ) : null}
          </View>

          <TouchableOpacity style={styles.editInfoButton}>
            <Text style={styles.editInfoText}>Edit Info</Text>
            <Feather name='edit' size={24} color='#B37650' />
          </TouchableOpacity>
        </View>
        <Notifications />
        <View style={styles.logOut}>
          <Feather name='log-out' size={25} color='#5B443E' />
          <Text onPress={handleLogOut}>Log Out</Text>
        </View>
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
  profileImage: {
    flex: 1,
    width: '100%',
    marginBottom: 500,
    resizeMode: 'cover',
  },
  profileContainerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2E5E4E',
  },
  profileSection: {
    backgroundColor: 'white',
    zIndex: 1,
    bottom: 0,
    marginBottom: 65,
    width: '100%',
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    position: 'absolute',
  },

  infoEmail: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    margin: 2,
  },
  infoEmailTitle: { fontSize: 18, fontWeight: 'bold' },

  userEmail: {
    fontSize: 18,
    marginLeft: 10,
  },

  infoTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#93A7AA',
  },

  editInfoButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'flex-end',
  },
  editInfoText: {
    color: '#B37650',
    fontWeight: 'bold',
    fontSize: 15,
    marginRight: 10,
  },
  logOut: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
});
