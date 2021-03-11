import React from 'react';
import { useHistory } from 'react-router-native';
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
    <View>
      <Text style={styles.activitiesTitle}>Activities</Text>
      <ScrollView horizontal>
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
                <Text
                  style={styles.activityCost}
                  key={fetchActivity.data.title}
                >
                  {fetchActivity.data.cost}
                </Text>
              </View>
            );
          })}
          <Feather
            name='plus-circle'
            size={32}
            color='#2E5E4E'
            onPress={addActivity}
            style={styles.addButton}
          />
        </View>
      </ScrollView>
    </View>
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
    color: '#2E5E4E',
  },
  activityContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityPhoto: {
    display: 'flex',
    height: 160,
    width: 240,
    borderRadius: 5,
    marginLeft: 20,
  },
  activityTitle: {
    color: '#2E5E4E',
    marginLeft: 30,
    marginRight: 20,
    alignSelf: 'center',
    fontSize: 13,
    marginTop: 10,
    fontWeight: 'bold',
  },
  activityCost: {
    color: '#93A7AA',
    marginLeft: 30,
    marginRight: 20,
    alignSelf: 'center',
    fontSize: 10,
    marginTop: 3,
    marginBottom: 10,
  },
  addButton: {
    marginLeft: 10,
    marginBottom: 45,
  },
});
