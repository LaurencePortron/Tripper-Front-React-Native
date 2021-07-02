import React from 'react';
import { useHistory } from 'react-router-native';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFirestoreCollection } from '../hooks';
import firebase from 'firebase/app';
import moment from 'moment';
import { COLORS } from '../colors.js';

export default function Activites({ tripId }) {
  const history = useHistory();

  const collectionRef = firebase
    .firestore()
    .collection('trips')
    .doc(tripId)
    .collection('activities');

  const addActivity = () => {
    history.push(`/add-activities/${tripId}`);
  };

  const archiveActivity = (activityId) => {
    collectionRef.doc(activityId).update({
      archived: true,
    });
  };

  const fetchActivities = useFirestoreCollection(collectionRef, [tripId]);

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
              <View key={fetchActivity.id}>
                <Image
                  source={{ uri: fetchActivity.data.photo }}
                  style={styles.activityPhoto}
                  alt='random'
                />

                {fetchActivity.data.archived ? (
                  <View style={styles.cancelledContainer}>
                    <Text style={styles.cancelledText}>Cancelled</Text>
                  </View>
                ) : (
                  <View style={styles.archiveContainer}>
                    <Feather
                      name='archive'
                      size={25}
                      color='black'
                      onPress={() => archiveActivity(fetchActivity.id)}
                    />

                    <Text style={styles.archiveText}>Archive</Text>
                  </View>
                )}
                <Text style={styles.activityTitle}>
                  {fetchActivity.data.title}
                </Text>
                <Text style={styles.activityCost}>
                  {moment(fetchActivity.data.date.toDate()).format('MMM Do')}
                </Text>
                <Text
                  style={styles.activityCost}
                  key={fetchActivity.data.title}
                >
                  ${fetchActivity.data.cost}
                </Text>
              </View>
            );
          })}
          <Feather
            name='plus-circle'
            size={32}
            color={COLORS.darkGreen}
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
    color: COLORS.lightGreen,
  },
  activityContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 100,
  },
  activityPhoto: {
    display: 'flex',
    height: 100,
    width: 180,
    borderRadius: 5,
    marginLeft: 20,
  },
  archiveContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    left: 30,
    top: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    padding: 5,
  },
  archiveText: { fontSize: 10, color: 'black', fontWeight: 'bold' },
  cancelledContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    left: 30,
    top: 10,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
  },

  cancelledText: {
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
  },
  activityTitle: {
    color: COLORS.darkGreen,
    marginLeft: 30,
    marginRight: 20,
    alignSelf: 'center',
    fontSize: 13,
    marginTop: 10,
    fontWeight: 'bold',
  },
  activityCost: {
    color: COLORS.lightGreen,
    marginLeft: 30,
    marginRight: 20,
    alignSelf: 'center',
    fontSize: 10,
    marginBottom: 10,
  },
  addButton: {
    marginLeft: 10,
    marginRight: 20,
    marginBottom: 60,
  },
});
