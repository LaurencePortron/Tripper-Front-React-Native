import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { ScrollView, View, Text, StyleSheet, Button } from 'react-native';
import { useHistory } from 'react-router-native';

export default function NotificationSettings(props) {
  const history = useHistory();

  const backToDashboard = () => {
    history.push('/dashboard');
  };

  return (
    <ScrollView style={styles.settingsContainer}>
      <View style={styles.settingsHeader}>
        <Text style={styles.settingsTitle}>Settings</Text>
        <Feather
          name='arrow-left-circle'
          size={32}
          color='black'
          style={styles.backToDashboardButton}
          onPress={backToDashboard}
        />
      </View>
      <View style={styles.profileSection}>
        <View style={styles.profileLinks}>
          <Feather name='user' size={25} color='black' />
          <Text>My info</Text>
          <Feather name='chevron-right' size={25} color='black' />
        </View>
        <View style={styles.profileLinks}>
          <Feather name='bell' size={25} color='black' />
          <Text>Notifications</Text>
          <Feather name='chevron-right' size={25} color='black' />
        </View>
        <View style={styles.profileLinks}>
          <Feather name='headphones' size={25} color='black' />
          <Text>Help</Text>
          <Feather name='chevron-right' size={25} color='black' />
        </View>
        <View style={styles.profileLinks}>
          <Feather name='help-circle' size={25} color='black' />
          <Text>About</Text>
          <Feather name='chevron-right' size={25} color='black' />
        </View>
        <View style={styles.logOut}>
          <Feather name='log-out' size={25} color='orange' />
          <Text>Log Out</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  settingsContainer: {
    width: '80%',
  },
  settingsHeader: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    alignContent: 'center',
  },
  settingsTitle: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#38516d',
  },
  profileSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  profileLinks: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,

    padding: 20,
  },
  backToDashboardButton: {
    marginTop: 20,
  },
  logOut: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});
