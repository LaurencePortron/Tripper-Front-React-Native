import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useHistory } from 'react-router-dom';

export default function NavigationMenuContent({ clickToCloseMenu }) {
  const history = useHistory();

  const navigateToSettings = () => {
    history.push('/settings');
  };

  const navigateToMessages = () => {
    history.push('/messages');
  };

  return (
    <View style={styles.container}>
      <Feather
        name='arrow-right-circle'
        size={25}
        color='orange'
        onPress={clickToCloseMenu}
        style={styles.arrowClose}
      />
      <Text style={styles.navItemStyle} onPress={navigateToSettings}>
        Account Settings
      </Text>
      <Text style={styles.navItemStyle}>My Trips</Text>
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
