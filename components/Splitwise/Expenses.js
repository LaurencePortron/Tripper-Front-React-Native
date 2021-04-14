import React from 'react';
import { useHistory } from 'react-router-native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import TripActivitiesExpenses from './TripActivitiesExpenses';
import CustomExpenses from './CustomExpenses';

export default function Expenses({ tripId }) {
  const history = useHistory();

  const navigateToSplitWise = () => {
    history.push(`/splitwise/${tripId}`);
  };

  return (
    <View style={styles.costContainer}>
      <Text style={styles.costTitle}>Expenses</Text>
      <TripActivitiesExpenses tripId={tripId} />
      <CustomExpenses tripId={tripId} />
    </View>
  );
}

const styles = StyleSheet.create({
  costContainer: {
    margin: 10,
    marginLeft: 20,
  },
  costTitle: {
    textAlign: 'left',
    marginTop: 10,

    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#93A7AA',
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
