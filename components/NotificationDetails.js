import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function NotificationDetails(props) {
  const [closeNotifications, setCloseNotifications] = useState(false);

  const handleCloseNotifications = () => {
    setCloseNotifications(false);
  };

  return (
    <View style={styles.notificationDetailsContainer}>
      <Text>Notification settings</Text>
      <TouchableOpacity onPress={handleCloseNotifications}>
        <Feather name='x-circle' size={24} color='black' />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  notificationDetailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    right: 30,
    top: 60,
  },
});
