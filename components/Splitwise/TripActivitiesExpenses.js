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

  if (!fetchTripDetails) {
    return null;
  }

  if (!fetchActivities) {
    return null;
  }

  const totalActivityCost = fetchActivities.reduce(function (
    previousTotalActivityCost,
    newActivityCost
  ) {
    return previousTotalActivityCost + newActivityCost.data.cost;
  },
  0);

  const totalTripCost = fetchTripDetails.data.cost + totalActivityCost;

  return (
    <View>
      <View style={styles.expenseContainer}>
        <View style={styles.expenseSection}>
          <Text style={styles.costSubcategory}>Total Cost: </Text>
          <Text style={styles.costData}>${totalTripCost}</Text>
        </View>
        <View style={styles.expenseSection}>
          <Text style={styles.costSubcategory}>Total trip cost: </Text>
          <Text style={styles.costData}>${fetchTripDetails.data.cost}</Text>
        </View>
        <View style={styles.expenseSection}>
          <Text style={styles.costSubcategory}>Total activities cost: </Text>
          <Text style={styles.costData}>${totalActivityCost}</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  costSubcategory: { fontWeight: 'bold', color: '#93A7AA' },
  costData: { color: '#93A7AA' },
  expenseContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  expenseTitle: {
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
  },
  expenseSection: {
    display: 'flex',
    flexDirection: 'column',
    borderColor: '#93A7AA',
    borderWidth: 0.5,
    width: '26%',
    height: 50,
  },
});
