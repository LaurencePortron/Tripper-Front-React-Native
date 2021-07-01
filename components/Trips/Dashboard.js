import React, { useState } from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useHistory } from 'react-router-native';
import { Feather } from '@expo/vector-icons';
import firebase from 'firebase/app';
import { useFirestoreCollection } from '../hooks';
import Footer from '../Footer';
import NotificationAlertButton from '../Notifications/NotificationAlertButton';

export default function Dashboard(props) {
  const [tab, setTab] = useState('active');
  const history = useHistory();
  var db = firebase.firestore();
  const user = firebase.auth().currentUser;
  const userId = user.uid;

  const fetchTrips = useFirestoreCollection(
    firebase.firestore().collection('trips').orderBy('endDate', 'asc'),
    []
  );

  const openTripOverview = (id) => {
    history.push(`/trip-overview/${id}`);
  };

  const addTrip = () => {
    history.push(`/add-trip`);
  };

  return (
    <View style={styles.dashboardContainer}>
      <View style={styles.header}>
        <Text style={styles.myTripsTitle}>My Trips</Text>
        <NotificationAlertButton />
      </View>
      <View style={styles.tabs}>
        <Text
          style={[styles.tabAlone, tab === 'active' ? styles.tabActive : null]}
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

      <ScrollView horizontal>
        {fetchTrips
          .filter((fetchTrip) => {
            if (tab === 'active') {
              return (
                fetchTrip.data.startDate.toDate() <= new Date() &&
                fetchTrip.data.endDate.toDate() >= new Date()
              );
            }
          })
          .map((fetchTrip) => {
            if (fetchTrip.data.userId === userId) {
              return (
                <View key={fetchTrip.id}>
                  <Image
                    source={{ uri: fetchTrip.data.photo }}
                    style={styles.Image}
                    alt='random'
                  ></Image>

                  <View style={styles.containerTriptitle}>
                    <Feather name='map-pin' size={24} color='#9D9996' />
                    <Text style={styles.tripTitle}>{fetchTrip.data.title}</Text>
                  </View>
                  <View style={styles.containerRightChevron}>
                    <Feather
                      name='chevron-right'
                      size={35}
                      color='white'
                      onPress={() => openTripOverview(fetchTrip.id)}
                      style={styles.rightChevron}
                    />
                  </View>
                </View>
              );
            }
          })}
        {fetchTrips
          .filter((fetchTrip) => {
            if (tab === 'upcoming') {
              return (
                fetchTrip.data.startDate.toDate() > new Date() &&
                fetchTrip.data.endDate.toDate() > new Date()
              );
            }
          })

          .map((fetchTrip) => {
            if (fetchTrip.data.userId === userId) {
              return (
                <View key={fetchTrip.id}>
                  <Image
                    source={{ uri: fetchTrip.data.photo }}
                    style={styles.Image}
                    alt='random'
                  ></Image>

                  <View style={styles.containerTriptitle}>
                    <Feather name='map-pin' size={24} color='#9D9996' />
                    <Text style={styles.tripTitle}>{fetchTrip.data.title}</Text>
                  </View>
                  <View style={styles.containerRightChevron}>
                    <Feather
                      name='chevron-right'
                      size={35}
                      color='white'
                      onPress={() => openTripOverview(fetchTrip.id)}
                      style={styles.rightChevron}
                    />
                  </View>
                </View>
              );
            }
          })}

        {fetchTrips
          .filter((fetchTrip) => {
            if (tab === 'past') {
              return fetchTrip.data.endDate.toDate() < new Date();
            }
          })

          .map((fetchTrip) => {
            if (fetchTrip.data.userId === userId) {
              return (
                <View key={fetchTrip.id}>
                  <Image
                    source={{ uri: fetchTrip.data.photo }}
                    alt='random'
                    style={styles.Image}
                  ></Image>

                  <View style={styles.containerTriptitle}>
                    <Feather name='map-pin' size={24} color='#9D9996' />
                    <Text style={styles.tripTitle}>{fetchTrip.data.title}</Text>
                  </View>
                  <View style={styles.containerRightChevron}>
                    <Feather
                      onPress={() => openTripOverview(fetchTrip.id)}
                      name='chevron-right'
                      size={35}
                      color='white'
                      style={styles.rightChevron}
                    />
                  </View>
                </View>
              );
            }
          })}
      </ScrollView>
      <TouchableOpacity style={styles.clickForDetailsSection} onPress={addTrip}>
        <Text style={styles.clickForDetailsText}>Click here to add trip</Text>
        <Feather
          name='plus-circle'
          size={24}
          color='#2E5E4E'
          style={styles.addTripButton}
        />
      </TouchableOpacity>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  dashboardContainer: { width: '100%', height: '100%' },
  myTripsTitle: {
    marginTop: 25,
    fontSize: 25,
    marginLeft: 20,
    color: '#2E5E4E',
    fontWeight: 'bold',
  },
  tabs: {
    marginLeft: 20,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 25,
    marginBottom: 25,
  },
  tabAlone: {
    marginRight: 10,
    fontSize: 25,
    color: '#93A7AA',
  },
  tabActive: {
    borderBottomWidth: 2,
    fontWeight: 'bold',
    color: '#2E5E4E',
    textDecorationLine: 'underline',
  },

  Image: {
    borderRadius: 20,
    width: 350,
    height: 400,
    marginRight: 10,
    marginLeft: 10,
  },

  titleInfoSection: {
    display: 'flex',
    margin: 10,
  },
  containerTriptitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 330,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 9,
    padding: 10,
  },
  tripTitle: { fontWeight: 'bold', marginLeft: 5 },
  containerRightChevron: {
    position: 'absolute',
    top: 330,
    right: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 9,
  },
  addTripButton: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginLeft: 20,
  },
  clickForDetailsSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginBottom: 10,
    bottom: 70,
  },
  clickForDetailsText: { fontWeight: 'bold', color: '#93A7AA' },
});
