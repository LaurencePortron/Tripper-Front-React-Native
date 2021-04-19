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

  const fetchFriends = useFirestoreCollection(
    firebase.firestore().collection('trips').doc(tripId).collection('friends'),
    [tripId]
  );

  // if one expense has more than one participant this expense should by divided by the number of participants

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

  const amountOfExpenses = fetchExpenses.map((expense) => {
    return expense.data.amount;
  });

  const totalOwned = amountOfExpenses.reduce(function (
    previousTotalExpenseBalance,
    newExpenseBalance
  ) {
    return previousTotalExpenseBalance + newExpenseBalance;
  },
  0);

  const expenseArray = [
    {
      title: 'Total Cost:',
      costData: totalTripCost,
    },
    {
      title: 'Trip cost:',
      costData: fetchTripDetails.data.cost,
    },
    {
      title: 'Activities cost:',
      costData: totalActivityCost,
    },
    {
      title: 'Balance Expenses:',
      costData: totalExpenseBalance,
    },
    {
      title: 'Money owed:',
      costData: totalOwned,
    },
    {
      title: 'Money lent/due:',
      costData: 'TBD',
    },
  ];

  return (
    <View style={styles.costContainer}>
      <Text style={styles.costTitle}>Expenses</Text>
      <View style={styles.expenseContainer}>
        {expenseArray.map((expense) => {
          return (
            <View style={styles.expenseSection}>
              <Text style={styles.costSubcategory}>{expense.title} </Text>
              <Text style={styles.costData}>${expense.costData}</Text>
              <Text style={styles.costData}></Text>
            </View>
          );
        })}
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
