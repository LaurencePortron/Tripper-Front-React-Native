import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-native';
import API from '../services/API';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFirestoreCollection, useFirestoreDocument } from './hooks';
import firebase from 'firebase/app';

export default function Activites({ tripId }) {
  const history = useHistory();

  const addActivity = () => {
    history.push(`/add-activities/${tripId}`);
  };

  const fetchActivities = useFirestoreCollection(
    firebase
      .firestore()
      .collection('trips')
      .doc(tripId)
      .collection('activities'),
    [tripId]
  );

  if (!fetchActivities) {
    return null;
  }

  return (
    <ScrollView>
      <Text style={styles.activitiesTitle}>Activities</Text>
      <View style={styles.activityContainer}>
        {fetchActivities.map((fetchActivity) => {
          return (
            <View>
              <Image
                source={{ uri: fetchActivity.data.photo }}
                style={styles.activityPhoto}
                alt='random'
              />

              <Text style={styles.activityTitle} key={fetchActivity.id}>
                {fetchActivity.data.title}
              </Text>
              <Text style={styles.activityCost} key={fetchActivity.data.title}>
                {fetchActivity.data.cost}
              </Text>
            </View>
          );
        })}
        <Feather
          name='plus-circle'
          size={32}
          color='black'
          onPress={addActivity}
          style={styles.addButton}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  activitiesTitle: {
    textAlign: 'left',
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#38516d',
  },
  activityContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  activityPhoto: {
    display: 'flex',
    height: 70,
    width: 140,
    borderRadius: 5,
    marginLeft: 20,
  },
  activityTitle: {
    color: '#38516d',
    marginLeft: 30,
    marginRight: 20,
    alignSelf: 'center',
    fontSize: 13,
    marginTop: 10,
  },
  activityCost: {
    color: 'black',
    marginLeft: 30,
    marginRight: 20,
    alignSelf: 'center',
    fontSize: 10,
    marginTop: 3,
    marginBottom: 10,
  },
  addButton: {
    alignSelf: 'center',
    marginBottom: 40,
    marginLeft: 20,
  },
});
