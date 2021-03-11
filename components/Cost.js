import React from 'react';
import { useHistory } from 'react-router-native';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFirestoreDocument } from './hooks';
import firebase from 'firebase/app';

export default function Cost({ tripId }) {
  const fetchTripDetails = useFirestoreDocument(
    firebase.firestore().collection('trips').doc(tripId),
    [tripId]
  );

  if (!fetchTripDetails) {
    return null;
  }

  return (
    <View>
      <Text style={styles.activitiesTitle}>Cost</Text>

      <Text style={styles.costSubcategory}>
        Total Cost: {fetchTripDetails.data.cost}
      </Text>
      <Text style={styles.costSubcategory}>
        Total trip cost: {fetchTripDetails.data.cost}
      </Text>
      <Text style={styles.costSubcategory}>Total activities cost:</Text>
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
  costCategory: {
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
  },
  costSubcategory: {
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
  },
});
