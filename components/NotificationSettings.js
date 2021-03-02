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
    <ScrollView>
      <Feather
        name='arrow-left-circle'
        size={32}
        color='black'
        style={styles.backToDashboardButton}
        onPress={backToDashboard}
      />
      <View>
        <Text style={styles.myProfile}>Notifications</Text>

        <View style={styles.profileSections}>
          <Text style={styles.sectionsTitle}>Notification Preferences</Text>
          <View style={styles.notifications}>
            <Text style={styles.sectionsparagraph}>Message Notifications</Text>

            <Feather name='toggle-left' size={32} color='black' />
          </View>
          <View style={styles.notifications}>
            <Text style={styles.sectionsparagraph}>Trip Notifications</Text>

            <Feather name='toggle-right' size={32} color='black' />
          </View>
          <View style={styles.notifications}>
            <Text style={styles.sectionsparagraph}>Activity Notifications</Text>

            <Feather name='toggle-left' size={32} color='black' />
          </View>
          <Button
            style={styles.profileButton}
            type='submit'
            title='Save'
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
    alignItems: 'flex-start',
  },
  sectionsTitle: {
    textAlign: 'left',
    fontSize: 20,
  },
  backToDashboardButton: {
    marginTop: 20,
  },
  sectionsparagraph: {
    fontSize: 15,
    marginRight: 30,
  },
  notifications: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
