import React from 'react';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';
import firebase from 'firebase/app';
import BackToDashboardButton from './Buttons';

export default function NotificationSettings(props) {
  const history = useHistory();
  var db = firebase.firestore();
  require('firebase/firestore');

  const navigateToProfileInfo = () => {
    history.push('/myprofile');
  };

  const navigateToNotifications = () => {
    history.push('/notifications');
  };

  const navigateToHelpCenter = () => {
    history.push('/helpCenter');
  };

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
    <ScrollView>
      <View style={styles.settingsHeader}>
        <Text style={styles.settingsTitle}>Settings</Text>
        <BackToDashboardButton />
      </View>
      <View style={styles.profileSection}>
        <View style={styles.profileLinks}>
          <Feather name='user' size={25} color='black' />
          <Text onPress={navigateToProfileInfo}>My info</Text>
          <Feather name='chevron-right' size={25} color='black' />
        </View>
        <View style={styles.profileLinks}>
          <Feather name='bell' size={25} color='black' />
          <Text onPress={navigateToNotifications}>Notifications</Text>
          <Feather name='chevron-right' size={25} color='black' />
        </View>
        <View style={styles.profileLinks}>
          <MaterialCommunityIcons name='piggy-bank' size={25} color='black' />
          <Text>Splitwise</Text>
          <Feather name='chevron-right' size={25} color='black' />
        </View>
        <View style={styles.profileLinks}>
          <Feather name='headphones' size={25} color='black' />
          <Text onPress={navigateToHelpCenter}>Help</Text>
          <Feather name='chevron-right' size={25} color='black' />
        </View>
        <View style={styles.profileLinks}>
          <Feather name='help-circle' size={25} color='black' />
          <Text>About</Text>
          <Feather name='chevron-right' size={25} color='black' />
        </View>
        <View style={styles.logOut}>
          <Feather name='log-out' size={25} color='orange' />
          <Text onPress={handleLogOut}>Log Out</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  settingsHeader: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#38516d',
    height: 80,
    padding: 10,
  },
  settingsTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  profileSection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  profileLinks: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    padding: 20,
  },

  logOut: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 10,
  },
});
