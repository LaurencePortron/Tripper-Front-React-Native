import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import Footer from './Footer';
import Activities from './Activities';
import Cost from './Cost';
import Stops from './Stops';
import Friends from './Friends';

export default function TripDetails(props) {
  const tripId = props.match.params.id;
  return (
    <ScrollView style={styles.tripDetailsContainer}>
      <Text style={styles.overviewTitle}>Peru</Text>
      <Cost tripId={tripId} />
      <Stops tripId={tripId} />
      <Friends tripId={tripId} />
      <Activities tripId={tripId} />
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tripDetailsContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  overviewTitle: {
    marginTop: 25,
    fontSize: 25,
    marginLeft: 20,
    color: '#2E5E4E',
    fontWeight: 'bold',
  },
});
