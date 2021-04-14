import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useFirestoreDocument, useFirestoreCollection } from '../hooks';
import firebase from 'firebase/app';

export default function TripActivitiesExpenses({ tripId }) {
  const fetchTripDetails = useFirestoreDocument(
    firebase.firestore().collection('trips').doc(tripId),
    [tripId]
  );

  const fetchActivities = useFirestoreCollection(
    firebase
      .firestore()
      .collection('trips')
      .doc(tripId)
      .collection('activities'),
    [tripId]
  );

  const TotalActivityCost = fetchActivities.reduce(function (
    totalCost,
    activitiesArray
  ) {
    return totalCost + activitiesArray.data.cost;
  },
  0);

  if (!fetchTripDetails) {
    return null;
  }

  if (!fetchActivities) {
    return null;
  }

  return (
    <View>
      <Text style={styles.expenseTitle}>Trip & activities expenses</Text>
      <Text style={styles.costSubcategory}>Total Cost: </Text>
      <Text>${fetchTripDetails.data.cost}</Text>
      <Text style={styles.costSubcategory}>Total trip cost: </Text>
      <Text>${fetchTripDetails.data.cost}</Text>
      <Text style={styles.costSubcategory}>Total activities cost: </Text>
      <Text>${TotalActivityCost}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  costSubcategory: { fontWeight: 'bold' },
  expenseTitle: {
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    color: '#2E5E4E',
  },
});
