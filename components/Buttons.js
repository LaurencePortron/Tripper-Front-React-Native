import React from 'react';
import { useHistory } from 'react-router-native';
import { Feather } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

export default function BackToDashboardButton() {
  const history = useHistory();
  const backToDashboard = () => {
    history.push('/dashboard');
  };
  return (
    <Feather
      name='arrow-left-circle'
      size={32}
      color='#2E5E4E'
      style={styles.backToDashboardButton}
      onPress={backToDashboard}
    />
  );
}
const styles = StyleSheet.create({
  backToDashboardButton: {
    marginRight: 30,
  },
});
