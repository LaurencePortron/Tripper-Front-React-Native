import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import NotificationDetails from './NotificationDetails';
import { COLORS } from '../colors.js';

export default function NotificationAlertButton(props) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity>
        <Feather
          name='bell'
          size={25}
          color={COLORS.darkGreen}
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
