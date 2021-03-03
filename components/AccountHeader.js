import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';
import { Feather } from '@expo/vector-icons';

export default function AccountHeader(props) {
  const history = useHistory();

  const backToSettings = () => {
    history.push('/settings');
  };

  return (
    <View style={styles.settingsHeader}>
      <Text style={styles.settingsTitle}>Settings</Text>
      <Feather
        name='arrow-left-circle'
        size={32}
        color='orange'
        style={styles.backToSettingsButton}
        onPress={backToSettings}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  backToSettingsButton: {
    marginRight: 30,
  },
  settingsHeader: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#38516d',
    height: 80,
    padding: 10,
  },
  settingsTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
});
