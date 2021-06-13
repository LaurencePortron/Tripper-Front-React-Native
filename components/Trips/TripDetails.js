import React from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import Footer from '../Footer';
import Activities from '../Activities/Activities';
import Expenses from '../Splitwise/Expenses';
import Stops from '../Stops/Stops';
import Friends from '../Friends/Friends';
import firebase from 'firebase/app';
import { useFirestoreDocument } from '../hooks';
import { Feather } from '@expo/vector-icons';
import { useHistory } from 'react-router-native';
import CustomExpenses from '../Splitwise/CustomExpenses';

export default function TripDetails(props) {
  const tripId = props.match.params.id;
  const history = useHistory();
  const fetchTripDetails = useFirestoreDocument(
    firebase.firestore().collection('trips').doc(tripId),
    [tripId]
  );

  if (!fetchTripDetails) {
    return null;
  }
  const backToTripDetails = () => {
    history.push(`/trip-overview/${tripId}`);
  };

  return (
    <View>
      <ScrollView>
        <View style={styles.customExpensesHeader}>
          <Text style={styles.overviewTitle}>
            {fetchTripDetails.data.title}
          </Text>
          <Feather
            style={styles.backToTripButton}
            name='arrow-left-circle'
            size={32}
            color='#2E5E4E'
            onPress={backToTripDetails}
          />
        </View>
        <View style={styles.tripDetailsContainer}>
          <Expenses tripId={tripId} />
          <CustomExpenses tripId={tripId} />
          <Stops tripId={tripId} />
          <Friends tripId={tripId} />
          <Activities tripId={tripId} />
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  tripDetailsContainer: {
    height: '100%',
    width: '100%',
  },
  overviewTitle: {
    fontSize: 25,
    marginLeft: 20,
    color: '#2E5E4E',
    fontWeight: 'bold',
  },
  customExpensesHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 25,
  },
  backToTripButton: { left: 170 },
});
