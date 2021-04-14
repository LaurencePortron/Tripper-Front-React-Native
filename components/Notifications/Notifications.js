import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export default function Notifications(props) {
  const [notificationEnabled, setNotificationEnables] = useState(false);

  const changeToggle = () => {
    setNotificationEnables(true);
  };

  const HandleToggle = () => {
    return (
      <TouchableOpacity onPress={changeToggle}>
        {notificationEnabled ? (
          <Feather name='toggle-right' size={25} color='#2E5E4E' />
        ) : (
          <Feather name='toggle-left' size={25} color='#2E5E4E' />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.notificationSection}>
      <Text style={styles.notificationTitle}>Notifications</Text>
      {notificationTitles.map((notificationTitle) => {
        return (
          <View style={styles.singleNotificationSection}>
            <Text style={styles.singleNotification}>
              {notificationTitle.title}
            </Text>
            <HandleToggle />
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E5E4E',
    fontSize: 18,
  },
  singleNotificationSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  singleNotification: { margin: 5, fontSize: 20 },
});
