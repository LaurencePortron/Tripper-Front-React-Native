import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFirestoreCollection } from '../hooks';
import firebase from 'firebase/app';
import 'firebase/firestore';

export default function NotificationDetails(props) {
  const [closeNotifications, setCloseNotifications] = useState(false);

  const handleCloseNotifications = () => {
    setCloseNotifications(true);
  };

  return (
    <View>
      {closeNotifications ? null : (
        <View style={styles.notificationDetailsContainer}>
          <TouchableOpacity onPress={handleCloseNotifications}>
            <Feather name='x-circle' size={24} color='black' />
          </TouchableOpacity>
          <View style={styles.notificationBox}>
            <Text>Samy added a message</Text>
            <Text>Samy added a message</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  notificationDetailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    right: 30,
    top: 10,
    width: 150,
    backgroundColor: 'grey',
    position: 'absolute',
  },

  notificationHeader: {
    display: 'flex',
    flexDirection: 'row',
  },
});
