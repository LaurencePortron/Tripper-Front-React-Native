import React from 'react';
import { useHistory } from 'react-router-native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFirestoreDocument, useFirestoreCollection } from '../hooks';
import firebase from 'firebase/app';

export default function Cost({ tripId }) {
  const history = useHistory();
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

  const navigateToSplitWise = () => {
    history.push(`/splitwise/${tripId}`);
  };

  if (!fetchTripDetails) {
    return null;
  }

  if (!fetchActivities) {
    return null;
  }

  return (
    <View style={styles.costContainer}>
      <Text style={styles.costTitle}>Cost</Text>

      <Text style={styles.costSubcategory}>
        Total Cost: ${fetchTripDetails.data.cost}
      </Text>
      <View style={styles.costCategory}>
        <Text style={styles.costSubcategory}>
          Total trip cost: ${fetchTripDetails.data.cost}
        </Text>

        <Text style={styles.costSubcategory}>
          Total activities cost: ${TotalActivityCost}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.overviewNavigationSection}
        onPress={navigateToSplitWise}
      >
        <Text style={styles.overviewNavigationText}>
          Click here to see expenses
        </Text>
        <Feather name='arrow-right' size={24} color='#B37650' />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  costContainer: {
    margin: 10,
  },
  costTitle: {
    textAlign: 'left',
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E5E4E',
  },
  costCategory: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
  },
  costSubcategory: {
    marginLeft: 10,
  },
  overviewNavigationSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  overviewNavigationText: {
    color: '#B37650',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 10,
  },
});
