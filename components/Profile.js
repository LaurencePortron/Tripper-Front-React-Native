import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Footer from './Footer';

export default function Profile(props) {
  return (
    <View style={styles.profileContainer}>
      <Text style={styles.profileContainerTitle}>My Profile</Text>
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Information</Text>
        <TouchableOpacity style={styles.editInfoButton}>
          <Text>Edit Info</Text>
          <Feather name='edit' size={24} color='#2E5E4E' />
        </TouchableOpacity>
      </View>
      <View style={styles.notificationSection}>
        <Text style={styles.notificationTitle}>Notifications</Text>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    height: '80%',
  },
  profileContainerTitle: {
    marginTop: 40,
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E5E4E',
    fontSize: 25,
  },
  infoSection: {},
  infoTitle: {
    marginTop: 40,
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E5E4E',
    fontSize: 18,
  },
  notificationSection: {},
  notificationTitle: {
    marginTop: 40,
    marginBottom: 40,
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E5E4E',
    fontSize: 18,
  },
  editInfoButton: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 20,
  },
});
