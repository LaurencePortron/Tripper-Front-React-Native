import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { ScrollView, View, Text, StyleSheet, Button } from 'react-native';
import { useHistory } from 'react-router-native';

export default function Friends(props) {
  const history = useHistory();

  const backToDashboard = () => {
    history.push('/dashboard');
  };

  return (
    <ScrollView>
      <Feather
        name='arrow-left-circle'
        size={32}
        color='black'
        style={styles.backToDashboardButton}
        onPress={backToDashboard}
      />
      <View>
        <Text style={styles.myProfile}>My Profile</Text>

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
  backToDashboardButton: {
    marginTop: 20,
  },
});
