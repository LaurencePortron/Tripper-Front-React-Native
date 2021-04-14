import React from 'react';
import { useHistory } from 'react-router-native';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function Stops({ tripId }) {
  return (
    <View style={styles.stopContainer}>
      <Text style={styles.stopTitle}>Stops</Text>
      <Text style={styles.stopText}>Here is your itinerary</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  stopContainer: {
    margin: 10,
  },
  stopTitle: {
    textAlign: 'left',
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E5E4E',
  },
  stopText: {
    margin: 10,
  },
});
