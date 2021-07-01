import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import Toggle from './Toggle';
import firebase from 'firebase/app';

export default function Notifications(props) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  var db = firebase.firestore();
  const user = firebase.auth().currentUser;
  const userId = user.uid;

  const collectionRef = firebase.firestore().collection('accounts');

  const handleExpenseToggle = () => {
    if (!isEnabled) {
      collectionRef.doc(userId).update({
        notifSplitwise: true,
      });
    } else {
      collectionRef.doc(userId).update({
        notifSplitwise: false,
      });
    }
  };

  const handleMessageToggle = () => {
    if (!isEnabled) {
      collectionRef.doc(userId).update({
        notifMessages: true,
      });
    } else {
      collectionRef.doc(userId).update({
        notifMessages: false,
      });
    }
  };
  const handleCancellationToggle = () => {
    if (!isEnabled) {
      collectionRef.doc(userId).update({
        notifCancellations: true,
      });
    } else {
      collectionRef.doc(userId).update({
        notifCancellations: false,
      });
    }
  };
  return (
    <View style={styles.notificationSection}>
      <Text style={styles.notificationTitle}>Notifications</Text>
      <View style={styles.singleNotificationSection}>
        <Text style={styles.singleNotification}>Messages</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#93A7AA' }}
          thumbColor={isEnabled ? '#2E5E4E' : '#f4f3f4'}
          onValueChange={() => {
            handleMessageToggle();
            toggleSwitch();
          }}
          value={isEnabled}
        />
      </View>
      <View style={styles.singleNotificationSection}>
        <Text style={styles.singleNotification}>Expenses</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#93A7AA' }}
          thumbColor={isEnabled ? '#2E5E4E' : '#f4f3f4'}
          onValueChange={() => {
            handleExpenseToggle();
            toggleSwitch();
          }}
          value={isEnabled}
        />
      </View>
      <View style={styles.singleNotificationSection}>
        <Text style={styles.singleNotification}>Cancellations</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#93A7AA' }}
          thumbColor={isEnabled ? '#2E5E4E' : '#f4f3f4'}
          onValueChange={() => {
            handleCancellationToggle();
            toggleSwitch();
          }}
          value={isEnabled}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  notificationSection: {},
  notificationTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 20,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#93A7AA',
  },
  singleNotificationSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  singleNotification: { fontSize: 18, marginRight: 20 },
});
