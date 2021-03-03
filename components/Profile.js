import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Button,
  Image,
} from 'react-native';
import AccountHeader from './AccountHeader';

export default function Friends(props) {
  return (
    <ScrollView style={styles.settingsContainer}>
      <AccountHeader />
      {/* <Image
        source={require('./images/avatar.png')}
        style={styles.Image}
        alt='random'
      ></Image> */}
      <View>
        <View style={styles.profileSections}>
          <Text style={styles.sectionsTitle}>Laurence</Text>
          <Text style={styles.sectionsTitle}>Email</Text>
          <Text style={styles.sectionsTitle}>Password</Text>
          <Button
            style={styles.profileButton}
            type='submit'
            title='Edit'
          ></Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  myProfile: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 40,
    fontWeight: 'bold',
    color: '#38516d',
  },
  profileSections: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
  },
  sectionsTitle: {
    fontSize: 20,
  },

  settingsContainer: {
    width: '100%',
  },
  // Image: {
  //   width: '50%',
  //   height: '50%',
  // },
});
