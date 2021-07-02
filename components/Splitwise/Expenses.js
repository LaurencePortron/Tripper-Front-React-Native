import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFirestoreDocument, useFirestoreCollection } from '../hooks';
import firebase from 'firebase/app';
import { useHistory } from 'react-router-native';
import { COLORS } from '../colors.js';

export default function Expenses({ tripId }) {
  const history = useHistory();

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

  const amountOfExpenses = fetchExpenses.map((expense) => {
    return expense.data.amount;
  });

  const totalOwed = amountOfExpenses.reduce(function (
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
  ];

  return (
    <View style={styles.costContainer}>
      <Text style={styles.costTitle}>Expenses</Text>
      <View style={styles.expenseContainer}>
        {expenseArray.map((expense) => {
          return (
            <View style={styles.expenseSection} key={expense.title}>
              <View style={styles.dataSection}>
                <Text style={styles.costDataTitle}>{expense.title} </Text>
                <Text style={styles.costData}>${expense.costData}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  expenseSection: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ececec',
    margin: 10,
    padding: 10,
    height: 50,
    alignItems: 'center',
  },
  dataSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  costContainer: {
    margin: 10,
  },
  costTitle: {
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.lightGreen,
    marginLeft: 10,
  },
  costDataTitle: { fontWeight: 'bold' },
  expenseSubTitle: { color: COLORS.lightGreen },
  overviewNavigationSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  overviewNavigationText: {
    color: COLORS.brown,
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
    color: COLORS.brown,
    fontWeight: 'bold',
    fontSize: 15,
  },

  goToCustomExpensesContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },

  goToCustomExpensesText: {
    color: COLORS.brown,
  },
});
