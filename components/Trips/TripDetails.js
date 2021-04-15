import React from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import Footer from '../Footer';
import Activities from '../Activities/Activities';
import Expenses from '../Splitwise/Expenses';
import Stops from '../Stops/Stops';
import Friends from '../Friends/Friends';
import { useFirestoreDocument } from '../hooks';
import firebase from 'firebase/app';

export default function TripDetails(props) {
  const tripId = props.match.params.id;

  const fetchTripDetails = useFirestoreDocument(
    firebase.firestore().collection('trips').doc(tripId),
    [tripId]
  );

  if (!fetchTripDetails) {
    return null;
  }

  return (
    <View>
      <ScrollView style={styles.tripDetailsContainer}>
        <Text style={styles.overviewTitle}>{fetchTripDetails.data.title}</Text>
        <Expenses tripId={tripId} />
        <Stops tripId={tripId} />
        <Friends tripId={tripId} />
        <Activities tripId={tripId} />
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
    marginTop: 25,
    fontSize: 25,
    marginLeft: 20,
    color: '#2E5E4E',
    fontWeight: 'bold',
  },
});