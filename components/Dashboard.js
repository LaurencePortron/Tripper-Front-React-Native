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
import NavigationMenu from './NavigationMenu';
// import AccountHeader from './AccountHeader';

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

  // user
  //   .sendEmailVerification()
  //   .then(function () {
  //     console.log('email sent');
  //   })
  //   .catch(function (error) {
  //     console.log('not sent', error);
  //   });

  return (
    <ScrollView>
      <View style={styles.dashboardScrollView}>
        <NavigationMenu />
      </View>
      <Text style={styles.myTripsTitle}>My Trips</Text>
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

      <View>
        {fetchTrips
          .filter((fetchTrip) => {
            if (tab === 'active') {
              return (
                new Date(fetchTrip.data.startDate) <= new Date() &&
                new Date(fetchTrip.data.endDate) >= new Date()
              );
            }
          })
          .slice(0, 1)
          .map((fetchTrip) => {
            return (
              <View style={styles.fetchedTrip}>
                <Image
                  source={{ uri: fetchTrip.data.photo }}
                  style={styles.Image}
                  alt='random'
                ></Image>
                <Text style={styles.containerdatesDashboard}>
                  {moment(fetchTrip.data.startDate).format('MMM Do')} -
                  {moment(fetchTrip.data.endDate).format('MMM Do')}
                </Text>
                <View style={styles.titleInfoSection}>
                  <Text style={styles.containerTriptitle}>
                    {fetchTrip.data.title}
                  </Text>
                  <Feather
                    name='info'
                    size={20}
                    color='white'
                    onPress={() => openTripDetails(fetchTrip.id)}
                    style={styles.infoButton}
                  />
                </View>
                <Text style={styles.status}>Active</Text>
              </View>
            );
          })}
        {fetchTrips
          .filter((fetchTrip) => {
            if (tab === 'upcoming') {
              return (
                Date.parse(fetchTrip.data.endDate) > Date.parse(new Date())
              );
            }
          })
          .slice(0, 1)
          .map((fetchTrip) => {
            return (
              <View style={styles.fetchedTrip}>
                <Image
                  source={{ uri: fetchTrip.data.photo }}
                  style={styles.Image}
                  alt='random'
                ></Image>
                <Text style={styles.containerdatesDashboard}>
                  {moment(fetchTrip.data.startDate).format('MMM Do')}{' '}
                  <Text> - </Text>
                  {moment(fetchTrip.data.endDate).format('MMM Do')}
                </Text>
                <View style={styles.titleInfoSection}>
                  <Text style={styles.containerTriptitle}>
                    {fetchTrip.data.title}
                  </Text>
                  <Feather
                    name='info'
                    size={20}
                    color='white'
                    onPress={() => openTripDetails(fetchTrip.id)}
                    style={styles.infoButton}
                  />
                </View>

                <Text style={styles.status}>Upcoming</Text>
              </View>
            );
          })}

        {fetchTrips
          .filter((fetchTrip) => {
            if (tab === 'past') {
              return (
                Date.parse(fetchTrip.data.endDate) < Date.parse(new Date())
              );
            }
          })
          .slice(0, 1)
          .map((fetchTrip) => {
            return (
              <View style={styles.fetchedTrip}>
                <Image
                  source={{ uri: fetchTrip.data.photo }}
                  style={styles.Image}
                  alt='random'
                ></Image>
                <Text style={styles.containerdatesDashboard}>
                  {moment(fetchTrip.data.startDate).format('MMM Do')}
                  <Text> - </Text>
                  {moment(fetchTrip.data.endDate).format('MMM Do')}
                </Text>
                <View style={styles.titleInfoSection}>
                  <Text style={styles.containerTriptitle}>
                    {fetchTrip.data.title}
                  </Text>

                  <Feather
                    name='info'
                    size={20}
                    color='white'
                    onPress={() => openTripDetails(fetchTrip.id)}
                    style={styles.infoButton}
                  />
                </View>

                <Text style={styles.status}>Past</Text>
              </View>
            );
          })}

        <View style={styles.trips}>
          {fetchTrips
            .filter((fetchTrip) => {
              if (tab === 'active') {
                return (
                  Date.parse(fetchTrip.data.startDate) <=
                    Date.parse(new Date()) &&
                  Date.parse(fetchTrip.data.endDate) >= Date.parse(new Date())
                );
              }
            })
            .slice(1)
            .map((fetchTrip) => {
              return (
                <View style={styles.fetchedTrip}>
                  <View style={styles.tripsList}>
                    <TouchableOpacity
                      onPress={() => openTripDetails(fetchTrip.id)}
                    >
                      <Image
                        source={{ uri: fetchTrip.data.photo }}
                        style={styles.ImageList}
                        alt='random'
                      ></Image>
                    </TouchableOpacity>
                    <View style={styles.titleDatesList}>
                      <Text style={styles.TripTitle}>
                        {fetchTrip.data.title}
                      </Text>
                      <Text style={styles.dates}>
                        {moment(fetchTrip.data.startDate).format('MMM Do')}{' '}
                        <Text> - </Text>
                        {moment(fetchTrip.data.endDate).format('MMM Do')}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
        </View>

        <View style={styles.trips}>
          {fetchTrips
            .filter((fetchTrip) => {
              if (tab === 'upcoming') {
                return (
                  Date.parse(fetchTrip.data.endDate) > Date.parse(new Date())
                );
              }
            })
            .slice(1)
            .map((fetchTrip) => {
              return (
                <View style={styles.fetchedTrip}>
                  <View style={styles.tripsList}>
                    <TouchableOpacity
                      onPress={() => openTripDetails(fetchTrip.id)}
                    >
                      <Image
                        source={{ uri: fetchTrip.data.photo }}
                        style={styles.ImageList}
                        alt='random'
                      ></Image>
                    </TouchableOpacity>
                    <View style={styles.titleDatesList}>
                      <Text style={styles.TripTitle}>
                        {fetchTrip.data.title}
                      </Text>
                      <Text style={styles.dates}>
                        {moment(fetchTrip.data.startDate).format('MMM Do')}{' '}
                        <Text> - </Text>
                        {moment(fetchTrip.data.endDate).format('MMM Do')}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
        </View>
        <View style={styles.trips}>
          {fetchTrips
            .filter((fetchTrip) => {
              if (tab === 'past') {
                return (
                  Date.parse(fetchTrip.data.endDate) < Date.parse(new Date())
                );
              }
            })
            .slice(1)
            .map((fetchTrip) => {
              return (
                <View style={styles.fetchedTrip}>
                  <View style={styles.tripsList}>
                    <TouchableOpacity
                      onPress={() => openTripDetails(fetchTrip.id)}
                    >
                      <Image
                        source={{ uri: fetchTrip.data.photo }}
                        style={styles.ImageList}
                        alt='random'
                      ></Image>
                    </TouchableOpacity>
                    <View style={styles.titleDatesList}>
                      <Text style={styles.TripTitle}>
                        {fetchTrip.data.title}
                      </Text>
                      <Text style={styles.dates}>
                        {moment(fetchTrip.data.startDate).format('MMM Do')}{' '}
                        <Text> - </Text>
                        {moment(fetchTrip.data.endDate).format('MMM Do')}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
        </View>
      </View>
      <View style={styles.addTripButton}>
        <Feather name='plus-circle' size={32} color='black' onPress={addTrip} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dashboardScrollView: {
    display: 'flex',
    flexDirection: 'row-reverse',
    zIndex: 1,
  },
  myTripsTitle: {
    marginBottom: 20,
    padding: 30,
    fontSize: 20,
    color: 'orange',
    backgroundColor: '#38516d',
  },
  tabs: { marginLeft: 20, display: 'flex', flexDirection: 'row' },
  tabAlone: {
    margin: 10,
    fontSize: 20,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderColor: '#38516d',
    fontWeight: 'bold',
    color: '#38516d',
    textDecorationLine: 'underline',
  },
  ImageList: {
    height: 90,
    width: 180,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 20,
    borderRadius: 10,
  },
  Image: {
    borderRadius: 10,
    width: 330,
    height: 230,
    marginLeft: 20,
  },
  fetchedTrip: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  containerdatesDashboard: {
    display: 'flex',
    position: 'absolute',
    top: 200,
    left: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  titleInfoSection: { display: 'flex', margin: 10 },
  containerTriptitle: {
    display: 'flex',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    position: 'absolute',
    bottom: 190,
    left: 20,
  },
  infoButton: {
    marginLeft: 12,
    position: 'absolute',
    bottom: 20,
    left: 280,
  },
  status: {
    textAlign: 'left',
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#38516d',
  },
  dates: {
    display: 'flex',
    color: 'black',
    fontSize: 13,
  },
  tripsList: { flexDirection: 'row', marginTop: 20 },
  trips: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  TripTitle: {
    color: 'black',
    marginLeft: 10,
    marginRight: 20,
    marginBottom: 5,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
  addTripButton: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginLeft: 20,
    marginTop: 20,
  },
  titleDatesList: {
    display: 'flex',
    flexDirection: 'column',
    width: 150,
    alignItems: 'center',
    marginTop: 30,
  },
});
