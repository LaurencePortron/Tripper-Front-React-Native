import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFirestoreDocument, useFirestoreCollection } from '../hooks';
import firebase from 'firebase/app';
import CustomExpenses from './CustomExpenses';
import { Feather } from '@expo/vector-icons';
import { useHistory } from 'react-router-native';

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

  const goToCustomExpenses = () => {
    history.push(`/custom-expenses/${tripId}`);
  };

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
              <Text style={styles.costSubcategory}>{expense.title} </Text>
              <Text style={styles.costData}>${expense.costData}</Text>
              <Text style={styles.costData}></Text>
            </View>
          );
        })}
      </View>

      {/* <CustomExpenses tripId={tripId} totalOwed={totalOwed} /> */}
      <TouchableOpacity onPress={goToCustomExpenses}>
        <View style={styles.goToCustomExpensesContainer}>
          <Text style={styles.goToCustomExpensesText}>Custom Expenses</Text>
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

  goToCustomExpensesContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },

  goToCustomExpensesText: {
    color: '#B37650',
  },
});
