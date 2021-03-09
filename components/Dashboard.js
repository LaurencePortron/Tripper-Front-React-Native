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

export default function Dashboard(props) {
  const [tab, setTab] = useState('active');
  const history = useHistory();

  const fetchTrips = useFirestoreCollection(
    firebase.firestore().collection('trips'),
    []
  );

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
              return (
                <View>
                  <Image
                    source={{ uri: fetchTrip.data.photo }}
                    style={styles.Image}
                    alt='random'
                  ></Image>
                  <Text style={styles.containerdatesDashboard}>
                    {moment(fetchTrip.data.startDate.toDate()).format('MMM Do')}{' '}
                    -{moment(fetchTrip.data.endDate.toDate()).format('MMM Do')}
                  </Text>
                  <View style={styles.containerTriptitle}>
                    <Feather name='map-pin' size={24} color='#9D9996' />
                    <Text>{fetchTrip.data.title}</Text>
                  </View>
                  <Feather
                    name='chevron-right'
                    size={35}
                    color='white'
                    onPress={() => openTripDetails(fetchTrip.id)}
                    style={styles.infoButton}
                  />
                </View>
              );
            })}
          {fetchTrips
            .filter((fetchTrip) => {
              if (tab === 'upcoming') {
                return fetchTrip.data.endDate.toDate() > new Date();
              }
            })

            .map((fetchTrip) => {
              return (
                <View>
                  <Image
                    source={{ uri: fetchTrip.data.photo }}
                    style={styles.Image}
                    alt='random'
                  ></Image>
                  <Text style={styles.containerdatesDashboard}>
                    {moment(fetchTrip.data.startDate.toDate()).format('MMM Do')}{' '}
                    <Text> - </Text>
                    {moment(fetchTrip.data.endDate.toDate()).format('MMM Do')}
                  </Text>

                  <View style={styles.containerTriptitle}>
                    <Feather name='map-pin' size={24} color='#9D9996' />
                    <Text>{fetchTrip.data.title}</Text>
                  </View>

                  <Feather
                    name='chevron-right'
                    size={35}
                    color='white'
                    onPress={() => openTripDetails(fetchTrip.id)}
                    style={styles.infoButton}
                  />
                </View>
              );
            })}

          {fetchTrips
            .filter((fetchTrip) => {
              if (tab === 'past') {
                return fetchTrip.data.endDate.toDate() < new Date();
              }
            })

            .map((fetchTrip) => {
              return (
                <View>
                  <Image
                    source={{ uri: fetchTrip.data.photo }}
                    alt='random'
                    style={styles.Image}
                  ></Image>
                  <Text style={styles.containerdatesDashboard}>
                    {moment(fetchTrip.data.startDate.toDate()).format('MMM Do')}
                    <Text> - </Text>
                    {moment(fetchTrip.data.endDate.toDate()).format('MMM Do')}
                  </Text>

                  <View style={styles.containerTriptitle}>
                    <Feather name='map-pin' size={24} color='#9D9996' />
                    <Text>{fetchTrip.data.title}</Text>
                  </View>

                  <Feather
                    onPress={() => openTripDetails(fetchTrip.id)}
                    name='chevron-right'
                    size={35}
                    color='white'
                    style={styles.rightChevron}
                  />
                </View>
              );
            })}
        </ScrollView>
      </View>
      <Feather
        name='plus'
        size={35}
        color='black'
        onPress={addTrip}
        style={styles.addTripButton}
      />
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dashboardContainer: { width: '100%', height: '100%' },
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

  Image: {
    borderRadius: 20,
    width: 350,
    height: 450,
    marginRight: 10,
    marginLeft: 10,
  },

  containerdatesDashboard: {
    display: 'flex',
    position: 'absolute',
    top: 200,
    left: 30,
    color: '#2E5E4E',
    fontWeight: 'bold',
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
    top: 350,
    right: 250,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 9,
    padding: 10,
  },
  infoButton: {
    position: 'absolute',
    top: 350,
    right: 90,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 9,
  },
  addTripButton: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginLeft: 20,
    marginTop: 20,
    position: 'absolute',
  },
});
