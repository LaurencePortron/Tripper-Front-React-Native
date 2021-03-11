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
import { TouchableOpacity } from 'react-native';

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

  const navigateToTripOverview = () => {
    history.push(`/trip-overview/${tripId}`);
  };

  if (!fetchTripDetails) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Image
          source={{ uri: fetchTripDetails.data.photo }}
          style={styles.photo}
          alt='random'
        />
      </View>
      <View style={styles.tripDetails}>
        <View style={styles.locationSection}>
          <Feather name='map-pin' size={24} color='#9D9996' />
          <Text style={styles.tripTitle}>{fetchTripDetails.data.title}</Text>
          <Text style={styles.containerDates}>
            {moment(fetchTripDetails.data.startDate.toDate()).format('MMM Do')}{' '}
            -{moment(fetchTripDetails.data.endDate.toDate()).format('MMM Do')}
          </Text>
        </View>
        <View>
          <View style={styles.menuItemsSection}>
            <View style={styles.menuItem}>
              <Feather name='users' size={24} color='#93A7AA' />
              <Text>2 friends</Text>
            </View>
            <View style={styles.menuItem}>
              <Feather name='map' size={24} color='#93A7AA' />
              <Text>5 stops</Text>
            </View>
            <View style={styles.menuItem}>
              <Feather name='activity' size={24} color='#93A7AA' />
              <Text>10 activities</Text>
            </View>
            <View style={styles.menuItem}>
              <Feather name='credit-card' size={24} color='#93A7AA' />
              <Text> {fetchTripDetails.data.cost}</Text>
            </View>
          </View>
          <View style={styles.descriptionSection}>
            <Text style={styles.descriptionTitle}>Description:</Text>
            <Text style={styles.description}>
              {fetchTripDetails.data.description}
            </Text>

            <TouchableOpacity
              style={styles.overviewNavigationSection}
              onPress={navigateToTripOverview}
            >
              <Text style={styles.overviewNavigationText}>
                Click here to see overview
              </Text>
              <Feather name='arrow-right' size={24} color='#B37650' />
            </TouchableOpacity>
          </View>
          <BackToDashboardButton />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  photo: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
    marginBottom: 200,
  },
  containerDates: {
    display: 'flex',
    marginLeft: 20,
    color: '#93A7AA',
    fontSize: 15,
  },

  tripTitle: {
    color: '#2E5E4E',
    fontWeight: 'bold',
    fontSize: 30,
    marginLeft: 10,
  },
  locationSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  tripDetails: {
    backgroundColor: 'white',
    zIndex: 1,
    bottom: 0,
    width: '100%',
    height: 300,
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    position: 'absolute',
  },
  menuItemsSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  menuItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  descriptionSection: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    marginLeft: 10,
  },
  descriptionTitle: {
    textAlign: 'left',
    color: '#93A7AA',
    fontWeight: 'bold',
    fontSize: 20,
  },
  description: {
    marginTop: 10,
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
    marginRight: 10,
  },
});
