import React from 'react';
import AccountHeader from '../UserAccount/AccountHeader';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Messages(props) {
  return (
    <ScrollView>
      <AccountHeader />
      <Text style={styles.messages}>
        <Text style={styles.messageTitle}>Keep your friends posted </Text>{' '}
        &#x1f468;
      </Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  messages: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 30,
    marginBottom: 10,
  },
  messageTitle: {
    textAlign: 'center',
    fontSize: 20,
    color: '#38516d',
  },
});
