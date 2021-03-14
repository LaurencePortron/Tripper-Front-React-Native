import React from 'react';
import { useHistory } from 'react-router-native';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFirestoreDocument, useFirestoreCollection } from './hooks';
import firebase from 'firebase/app';

export default function Cost({ tripId }) {
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
    <View style={styles.costContainer}>
      <Text style={styles.activitiesTitle}>Cost</Text>

      <Text style={styles.costSubcategory}>
        Total Cost: {fetchTripDetails.data.cost}
      </Text>
      <View style={styles.costCategory}>
        <Text style={styles.costSubcategory}>
          Total trip cost: {fetchTripDetails.data.cost}
        </Text>

        <Text style={styles.costSubcategory}>
          Total activities cost:{TotalActivityCost}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  costContainer: {
    margin: 10,
  },
  activitiesTitle: {
    textAlign: 'left',
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E5E4E',
  },
  costCategory: {
    display: 'flex',
    flexDirection: 'row',
  },
  costSubcategory: {
    marginBottom: 10,
    borderWidth: 1,
  },
});
