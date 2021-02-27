import React, { useState, useEffect } from 'react';
import API from '../services/API';
import { useHistory } from 'react-router-native';
import moment from 'moment';
import Activities from './Activities';
import { ScrollView, View, Image, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Friends from './Friends';

export default function TripDetails(props) {
  const [fetchTripDetails, setFetchTripDetails] = useState(null);
  const history = useHistory();

  const tripId = props.match.params.id;

  useEffect(() => {
    API.get(`/trips/${tripId}`).then((res) => {
      setFetchTripDetails(res.data[0]);
    });
  }, [tripId]);

  const backToDashboard = () => {
    history.push(`/dashboard`);
  };

  const goToMessages = () => {
    history.push(`/messages`);
  };

  if (!fetchTripDetails) {
    return null;
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

  return (
    <ScrollView>
      <View style={styles.tripHeader}>
        <Image
          source={{ uri: fetchTripDetails.photo }}
          style={styles.photo}
          alt='random'
        />
        <View style={styles.arrowLeft}>
          <Feather
            name='arrow-left'
            size={30}
            color='orange'
            onPress={backToDashboard}
          />
        </View>
        <Text style={styles.containerDates}>
          {moment(fetchTripDetails.startDate).format('MMM Do')} -
          {moment(fetchTripDetails.endDATE).format('MMM Do')}
        </Text>
        <Feather
          name='message-circle'
          size={32}
          color='white'
          style={styles.messageButton}
          onPress={goToMessages}
        />
      </View>

      <Text style={styles.tripTitle}>{fetchTripDetails.title}</Text>
      <View>
        <Friends />
      </View>
      <View>
        <Activities tripId={tripId} />
      </View>
    </ScrollView>
  );
}
