import React, { useState } from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import firebase from 'firebase/app';

export default function Toggle(props) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  var db = firebase.firestore();
  const user = firebase.auth().currentUser;
  const userId = user.uid;

  const collectionRef = firebase.firestore().collection('settings');

  const handleNotificationToggle = () => {
    if (!isEnabled) {
      collectionRef.doc(userId).update({
        notifSplitwise: true,
        notifCancellations: false,
        notifMessages: false,
      });
    } else {
      collectionRef.doc(userId).update({
        notifSplitwise: false,
        notifCancellations: false,
        notifMessages: false,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: '#767577', true: '#93A7AA' }}
        thumbColor={isEnabled ? '#2E5E4E' : '#f4f3f4'}
        ios_backgroundColor='#3e3e3e'
        onValueChange={() => {
          toggleSwitch();
          handleNotificationToggle();
        }}
        value={isEnabled}
        style={styles.toggle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggle: { marginBottom: 10 },
});
