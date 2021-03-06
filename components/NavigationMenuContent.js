import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useHistory } from 'react-router-native';

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
      <View style={styles.navSectionStyle}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    position: 'absolute',
    backgroundColor: '#F9F9F9',
    zIndex: 2,
    height: 700,
    width: 200,
    borderRadius: 10,
  },
  navItemStyle: {
    padding: 10,
    color: 'orange',
    fontSize: 20,
  },
  navSectionStyle: {
    marginTop: 10,
    marginLeft: 10,
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
});
