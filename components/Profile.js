import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TextInput,
} from 'react-native';
import AccountHeader from './AccountHeader';

export default function Friends(props) {
  return (
    <ScrollView>
      <AccountHeader />
      {/* <Image
        source={require('./images/avatar.png')}
        style={styles.Image}
        alt='random'
      ></Image> */}
      <View>
        <View style={styles.profileSections}>
          <Text style={styles.sectionsTitle}>First name</Text>
          <TextInput
            style={styles.addInfo}
            placeholder='Description'
            name='description'
          />
          <Text style={styles.sectionsTitle}>Email</Text>
          <TextInput
            style={styles.addInfo}
            placeholder='Description'
            name='description'
          />
          <Text style={styles.sectionsTitle}>Change Password</Text>
          <TextInput
            style={styles.addInfo}
            placeholder='Description'
            name='description'
          />
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
    alignItems: 'center',
  },
  sectionsTitle: {
    fontSize: 20,
  },

  settingsContainer: {
    width: '100%',
  },
  addInfo: {
    display: 'flex',
    padding: 15,
    borderWidth: 1,
    borderColor: '#535b63',
    marginBottom: 15,
    margin: 10,
    width: 200,
  },
});
