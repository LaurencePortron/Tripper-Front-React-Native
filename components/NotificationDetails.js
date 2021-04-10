import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function NotificationDetails(props) {
  const [closeNotifications, setCloseNotifications] = useState(false);

  const handleCloseNotifications = () => {
    setCloseNotifications(true);
  };
  return (
    <View style={styles.notificationDetailsContainer}>
      <Text>Notification settings</Text>
      <Feather
        name='x-circle'
        size={24}
        color='black'
        onPress={handleCloseNotifications}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  notificationDetailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: 'green',
  },
});
