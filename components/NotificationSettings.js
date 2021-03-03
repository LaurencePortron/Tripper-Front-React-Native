import React from 'react';
import { Feather } from '@expo/vector-icons';
import { ScrollView, View, Text, StyleSheet, Button } from 'react-native';
import AccountHeader from './AccountHeader';

export default function NotificationSettings(props) {
  return (
    <ScrollView style={styles.settingsContainer}>
      <AccountHeader />
      <View>
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
  profileSections: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    alignItems: 'center',
  },
  sectionsTitle: {
    textAlign: 'left',
    fontSize: 20,
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

  settingsContainer: {
    width: '100%',
  },
});
