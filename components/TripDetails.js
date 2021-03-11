import React, { useState } from 'react';
import {
  TextInput,
  View,
  Button,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Footer from './Footer';
import { Feather } from '@expo/vector-icons';
import Activities from './Activities';
import Cost from './Cost';
import Stops from './Stops';

export default function TripDetails(props) {
  const tripId = props.match.params.id;
  return (
    <View>
      <Text style={styles.overviewTitle}>Overview</Text>
      <Cost tripId={tripId} />
      <Stops tripId={tripId} />
      <Activities tripId={tripId} />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  overviewTitle: {
    marginTop: 25,
    fontSize: 25,
    marginLeft: 20,
    color: '#2E5E4E',
    fontWeight: 'bold',
  },
});
