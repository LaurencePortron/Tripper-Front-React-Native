import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import NotificationDetails from './NotificationDetails';

export default function NotificationAlertButton() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity>
        <Feather
          name='bell'
          size={25}
          color='#2E5E4E'
          style={styles.NotificationAlertButton}
          onPress={() => setNotificationsOpen(!notificationsOpen)}
        />
      </TouchableOpacity>
      {notificationsOpen ? <NotificationDetails /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  NotificationAlertButton: {
    right: 30,
    marginTop: 25,
  },
});
