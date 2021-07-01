import React, { useState } from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';

export default function Maps({ fetchStops, fetchStopId }) {
  const [stopInfoVisible, setStopInfoVisible] = useState(false);

  const getLocation = fetchStops.map((coordinates) => {
    return {
      longitude: coordinates.data.longitude,
      latitude: coordinates.data.latitude,
    };
  });

  const [region, setRegion] = useState({
    longitude: getLocation.longitude,
    latitude: getLocation.latitude,
  });
  // need stop id on click for stop info

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={(region) => setRegion(region)}
      >
        {getLocation.map((coord) => {
          const stopId = fetchStops.id;
          return (
            <View key={fetchStops.id}>
              <Marker
                coordinate={{
                  latitude: coord.latitude,
                  longitude: coord.longitude,
                }}
                pinColor='red'
                onPress={() => {
                  setStopInfoVisible(!stopInfoVisible, fetchStops.id);
                }}
              />
            </View>
          );
        })}
      </MapView>
      {stopInfoVisible ? (
        <View style={styles.stopInfo}>
          {fetchStops.map((stop) => {
            return (
              <View key={stop.id}>
                <Text style={styles.stopInfoText}>{stop.data.description}</Text>
                <Text style={styles.stopInfoText}>{stop.data.title}</Text>
                <Text style={styles.stopInfoText}>2days stay</Text>
                <Text style={styles.stopInfoText}>
                  {moment(stop.data.date.toDate()).format('MMM Do')}
                </Text>
              </View>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: 350,
    height: 350,
  },
  stopInfo: {
    backgroundColor: 'white',
    position: 'absolute',
    padding: 10,
    backgroundColor: 'white',
    maxWidth: 200,
    maxHeight: 200,
    textAlign: 'left',
  },
});
