import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import NotificationDetails from './NotificationDetails';

export default function NotificationAlertButton() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const clickToOpenNotifications = () => {
    setNotificationsOpen(true);
  };

  return (
    <View>
      <TouchableOpacity>
        <Feather
          name='bell'
          size={25}
          color='#2E5E4E'
          style={styles.NotificationAlertButton}
          onPress={clickToOpenNotifications}
        />
      </TouchableOpacity>
      {notificationsOpen ? <NotificationDetails /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  NotificationAlertButton: {
    position: 'absolute',
    top: 40,
    right: 30,
  },
});
