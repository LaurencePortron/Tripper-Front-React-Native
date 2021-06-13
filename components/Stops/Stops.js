import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Maps from './Maps.js';
import { Feather } from '@expo/vector-icons';
import AddStopModal from './AddStopModal.js';
import firebase from 'firebase/app';
import { useFirestoreCollection } from '../hooks';

export default function Stops({ tripId }) {
  const [stopModalOpen, setStopModalOpen] = useState(false);

  const handleStopModalClosure = () => {
    setStopModalOpen(false);
  };

  const fetchStops = useFirestoreCollection(
    firebase.firestore().collection('trips').doc(tripId).collection('stops'),
    [tripId]
  );

  return (
    <View style={styles.stopContainer}>
      <Text style={styles.stopTitle}>Stops</Text>
      {fetchStops.map((coord) => {
        return (
          <View style={styles.stopDetails} key={fetchStops.id}>
            <Text style={styles.stopDescription}>
              {coord.data.description}:
            </Text>
            <Text style={styles.stopDescriptionTitle}>{coord.data.title}</Text>
          </View>
        );
      })}
      <Maps
        tripId={tripId}
        fetchStops={fetchStops}
        fetchStopId={fetchStops.id}
      />
      <TouchableOpacity
        style={styles.stopModalSection}
        onPress={() => setStopModalOpen(true)}
      >
        <Text style={styles.stopModalText}>Add Stop</Text>
        <Feather name='arrow-right' size={24} color='#B37650' />
      </TouchableOpacity>
      <AddStopModal
        tripId={tripId}
        show={stopModalOpen}
        handleStopModalClosure={handleStopModalClosure}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  stopContainer: {
    margin: 10,
  },
  stopTitle: {
    textAlign: 'left',
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#93A7AA',
  },

  stopModalSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
    marginLeft: 10,
  },

  stopModalText: {
    color: '#B37650',
    fontWeight: 'bold',
    fontSize: 15,
    marginRight: 10,
  },

  stopDetails: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
    marginBottom: 10,
  },

  stopDescription: {
    fontWeight: 'bold',
    marginRight: 10,
  },
});
