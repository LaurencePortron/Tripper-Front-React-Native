import React from 'react';
import { useHistory } from 'react-router-native';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function Cost({ tripId }) {
  return (
    <View>
      <Text style={styles.activitiesTitle}>Stops</Text>
      <Text style={styles.costSubcategory}>Total trip cost:</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  activitiesTitle: {
    textAlign: 'left',
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E5E4E',
  },
  costSubcategory: {
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
  },
});
