import React from 'react';
import { useHistory } from 'react-router-native';
import moment from 'moment';
import Activities from './Activities';
import { ScrollView, View, Image, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import firebase from 'firebase/app';
import Friends from './Friends';
import { useFirestoreDocument } from './hooks';
import BackToDashboardButton from './Buttons';

export default function TripDetails(props) {
  const tripId = props.match.params.id;
  const history = useHistory();

  const fetchTripDetails = useFirestoreDocument(
    firebase.firestore().collection('trips').doc(tripId),
    [tripId]
  );

  const goToMessages = () => {
    history.push(`/messages`);
  };

  if (!fetchTripDetails) {
    return null;
  }

  return (
    <ScrollView>
      <View style={styles.tripHeader}>
        <Image
          source={{ uri: fetchTripDetails.data.photo }}
          style={styles.photo}
          alt='random'
        />
        <View style={styles.arrowLeft}>
          <BackToDashboardButton />
        </View>
        <Text style={styles.containerDates}>
          {moment(fetchTripDetails.data.startDate).format('MMM Do')} -
          {moment(fetchTripDetails.data.endDate).format('MMM Do')}
        </Text>
        <Feather
          name='message-circle'
          size={32}
          color='white'
          style={styles.messageButton}
          onPress={goToMessages}
        />
      </View>

      <Text style={styles.tripTitle}>{fetchTripDetails.data.title}</Text>
      <View>
        <Friends />
      </View>
      <View>
        <Activities tripId={tripId} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tripHeader: {
    position: 'relative',
  },
  photo: {
    position: 'relative',
    width: 400,
    height: 230,
    opacity: 0.7,
  },
  arrowLeft: { position: 'absolute', top: 20, left: 8 },
  containerDates: {
    display: 'flex',
    position: 'absolute',
    top: 190,
    left: 20,
    color: 'orange',
    fontSize: 15,
  },
  messageButton: {
    position: 'relative',
    bottom: 50,
    left: 320,
  },
  tripTitle: {
    position: 'absolute',
    top: 120,
    left: 20,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
});
