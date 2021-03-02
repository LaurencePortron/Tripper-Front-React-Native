import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useHistory } from 'react-router-dom';

export default function NavigationMenuContent({ clickToCloseMenu }) {
  const history = useHistory();

  const navigateToProfile = () => {
    history.push('/myprofile');
  };

  const navigateToPhotos = () => {
    history.push('/myphotos');
  };

  const navigateToMessages = () => {
    history.push('/messages');
  };

  return (
    <View style={styles.container}>
      <Feather
        name='x-circle'
        size={30}
        color='orange'
        onPress={clickToCloseMenu}
      />
      <Text style={styles.navItemStyle} onPress={navigateToProfile}>
        My profile
      </Text>
      <Text style={styles.navItemStyle} onPress={navigateToPhotos}>
        Shared photos
      </Text>
      <TouchableOpacity onPress={navigateToMessages}>
        <Text style={styles.navItemStyle}>Messages</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 150,
    padding: 10,
    position: 'absolute',
    backgroundColor: 'white',
    zIndex: 2,
  },
  navItemStyle: {
    padding: 10,
    color: 'orange',
  },
  navSectionStyle: {},
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
});
