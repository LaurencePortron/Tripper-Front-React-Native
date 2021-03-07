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
import { AntDesign } from '@expo/vector-icons';

export default function Friends(props) {
  return (
    <ScrollView>
      <AccountHeader />

      <View style={styles.profileSections}>
        <View style={styles.profileTextTitle}>
          <AntDesign name='idcard' size={24} color='black' />
          <Text style={styles.sectionsTitle}>First name</Text>
        </View>
        <View style={styles.profileTextTitle}>
          <Feather name='mail' size={24} color='black' />
          <Text style={styles.sectionsTitle}>Email</Text>
        </View>
        <View style={styles.profileTextTitle}>
          <Feather name='lock' size={24} color='black' />
          <Text style={styles.sectionsTitle}>Change Password</Text>
        </View>
        <Button
          style={styles.profileButton}
          type='submit'
          title='Edit'
        ></Button>
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
    alignItems: 'flex-start',
  },
  profileTextTitle: { display: 'flex', flexDirection: 'row', margin: 10 },
  sectionsTitle: {
    fontSize: 20,
  },

  settingsContainer: {
    width: '100%',
  },
});
