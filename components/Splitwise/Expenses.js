import React, { useState } from 'react';
import { useHistory } from 'react-router-native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useFirestoreDocument, useFirestoreCollection } from '../hooks';
import firebase from 'firebase/app';

export default function Expenses({ tripId }) {
  const history = useHistory();

  const navigateToCustomExpenses = () => {
    history.push(`/custom-expenses/${tripId}`);
  };

  const fetchTripDetails = useFirestoreDocument(
    firebase.firestore().collection('trips').doc(tripId),
    [tripId]
  );

  const fetchExpenses = useFirestoreCollection(
    firebase.firestore().collection('trips').doc(tripId).collection('expenses'),
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

  const totalExpenseBalance = fetchExpenses.reduce(function (
    previousTotalExpenseBalance,
    newExpenseBalance
  ) {
    return previousTotalExpenseBalance + newExpenseBalance.data.amount;
  },
  0);

  const totalTripCost =
    fetchTripDetails.data.cost + totalActivityCost + totalExpenseBalance;

  return (
    <View style={styles.costContainer}>
      <Text style={styles.costTitle}>Expenses</Text>
      <View style={styles.expenseContainer}>
        <View style={styles.expenseSection}>
          <Text style={styles.costSubcategory}>Total Cost: </Text>
          <Text style={styles.costData}>${totalTripCost}</Text>
        </View>
        <View style={styles.expenseSection}>
          <Text style={styles.costSubcategory}>Trip cost: </Text>
          <Text style={styles.costData}>${fetchTripDetails.data.cost}</Text>
        </View>
        <View style={styles.expenseSection}>
          <Text style={styles.costSubcategory}>Activities cost: </Text>
          <Text style={styles.costData}>${totalActivityCost}</Text>
        </View>
      </View>
      <View style={styles.expenseSection}>
        <Text style={styles.costSubcategory}>Balance Expenses: </Text>
        <Text style={styles.costData}>${totalExpenseBalance}</Text>
      </View>
      <View style={styles.expenseSection}>
        <Text style={styles.costSubcategory}>Money owed: </Text>
        <Text style={styles.costData}>$TO BE DONE</Text>
      </View>
      <View style={styles.expenseSection}>
        <Text style={styles.costSubcategory}>Money lent/due: </Text>
        <Text style={styles.costData}>$TO BE DONE</Text>
      </View>
      <TouchableOpacity onPress={navigateToCustomExpenses}>
        <View style={styles.manageExpensesContainer}>
          <Text style={styles.manageExpensesText}>Manage Expenses</Text>
          <Feather name='arrow-right' size={24} color='#B37650' />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  expenseSection: { display: 'flex', flexDirection: 'row' },
  costContainer: {
    margin: 10,
    marginLeft: 20,
    marginRight: 40,
  },
  costTitle: {
    textAlign: 'left',
    marginTop: 10,

    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#93A7AA',
  },
  expenseSubTitle: { color: '#93A7AA' },
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
  },
  manageExpensesContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  manageExpensesText: {
    color: '#B37650',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
