import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import firebase from 'firebase/app';

export default function Notifications(props) {
  const [messageIsEnabled, setMessageIsEnabled] = useState(false);
  const [cancellationIsEnabled, setCancellationIsEnabled] = useState(false);
  const [expensesIsEnabled, setExpensesIsEnabled] = useState(false);

  const toggleMessageSwitch = () =>
    setMessageIsEnabled((previousState) => !previousState);

  const toggleCancellationSwitch = () =>
    setCancellationIsEnabled((previousState) => !previousState);

  const toggleExpenseSwitch = () =>
    setExpensesIsEnabled((previousState) => !previousState);

  var db = firebase.firestore();
  const user = firebase.auth().currentUser;
  const userId = user.uid;

  const collectionRef = firebase.firestore().collection('accounts');

  const handleExpenseToggle = () => {
    if (!expensesIsEnabled) {
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
    if (!messageIsEnabled) {
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
    if (!cancellationIsEnabled) {
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
          trackColor={{ false: '#767577', true: COLORS.lightGreen }}
          thumbColor={messageIsEnabled ? '#2E5E4E' : '#f4f3f4'}
          onValueChange={() => {
            handleMessageToggle();
            toggleMessageSwitch();
          }}
          value={messageIsEnabled}
          style={styles.toggle}
        />
      </View>
      <View style={styles.singleNotificationSection}>
        <Text style={styles.singleNotification}>Expenses</Text>
        <Switch
          trackColor={{ false: '#767577', true: COLORS.lightGreen }}
          thumbColor={expensesIsEnabled ? '#2E5E4E' : '#f4f3f4'}
          onValueChange={() => {
            handleExpenseToggle();
            toggleExpenseSwitch();
          }}
          value={expensesIsEnabled}
          style={styles.toggle}
        />
      </View>
      <View style={styles.singleNotificationSection}>
        <Text style={styles.singleNotification}>Cancellations</Text>
        <Switch
          trackColor={{ false: '#767577', true: COLORS.lightGreen }}
          thumbColor={cancellationIsEnabled ? '#2E5E4E' : '#f4f3f4'}
          onValueChange={() => {
            handleCancellationToggle();
            toggleCancellationSwitch();
          }}
          value={cancellationIsEnabled}
          style={styles.toggle}
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
    color: COLORS.lightGreen,
  },
  singleNotificationSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  singleNotification: { fontSize: 18, marginRight: 20 },
  toggle: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
  },
});
