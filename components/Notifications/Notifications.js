import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import Toggle from './Toggle';

export default function Notifications(props) {
  return (
    <View style={styles.notificationSection}>
      <Text style={styles.notificationTitle}>Notifications</Text>
      {notificationTitles.map((notificationTitle) => {
        return (
          <View style={styles.singleNotificationSection}>
            <Text style={styles.singleNotification}>
              {notificationTitle.title}
            </Text>
            <Toggle />
          </View>
        );
      })}
    </View>
  );
}

const notificationTitles = [
  {
    title: 'Messages',
  },
  {
    title: 'SplitWise',
  },
  {
    title: 'Cancellations',
  },
];

const styles = StyleSheet.create({
  notificationSection: {
    marginLeft: 20,
  },
  notificationTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2E5E4E',
  },
  singleNotificationSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  singleNotification: { fontSize: 20, marginRight: 20 },
});
