import React, { useState, useEffect } from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useHistory } from 'react-router-native';
import moment from 'moment';
import { Feather } from '@expo/vector-icons';
import firebase from 'firebase/app';
import { useFirestoreCollection } from './hooks';
import Footer from './Footer';
import MyCarousel from './Slider';

export default function Dashboard(props) {
  const [tab, setTab] = useState('active');
  const history = useHistory();

  const fetchTrips = useFirestoreCollection(
    firebase.firestore().collection('trips'),
    []
  );

  console.log(fetchTrips);

  const openTripDetails = (id) => {
    history.push(`/trip-details/${id}`);
  };

  const addTrip = () => {
    history.push(`/add-trip`);
  };

  const goToMessages = () => {
    history.push(`/messages`);
  };

  var user = firebase.auth().currentUser;

  return (
    <ScrollView>
      <View style={styles.dashboardContainer}>
        <Text style={styles.myTripsTitle}>My Trips</Text>
        <View style={styles.tabs}>
          <Text
            style={[
              styles.tabAlone,
              tab === 'active' ? styles.tabActive : null,
            ]}
            onPress={() => {
              setTab('active');
            }}
          >
            Active
          </Text>
          <Text
            style={[
              styles.tabAlone,
              tab === 'upcoming' ? styles.tabActive : null,
            ]}
            onPress={() => {
              setTab('upcoming');
            }}
          >
            Upcoming
          </Text>
          <Text
            style={[styles.tabAlone, tab === 'past' ? styles.tabActive : null]}
            onPress={() => {
              setTab('past');
            }}
          >
            Past
          </Text>
        </View>

        <Text>
          <MyCarousel fetchTrips={fetchTrips} />;
        </Text>
      </View>

      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dashboardContainer: { display: 'flex', flex: 1 },
  myTripsTitle: {
    marginTop: 10,
    fontSize: 25,
    marginLeft: 20,
    color: '#93A7AA',
    fontWeight: 'bold',
  },
  tabs: {
    marginLeft: 20,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
  },
  tabAlone: {
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    color: '#93A7AA',
  },
  tabActive: {
    borderBottomWidth: 2,
    fontWeight: 'bold',
    color: '#2E5E4E',
    textDecorationLine: 'underline',
  },
});
