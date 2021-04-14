import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import InviteModal from './InviteModal';
import { useFirestoreCollection } from './hooks';
import firebase from 'firebase/app';

export default function Friends({ tripId }) {
  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  const fetchFriends = useFirestoreCollection(
    firebase.firestore().collection('trips').doc(tripId).collection('friends'),
    [tripId]
  );

  const handleInviteModalClosure = (inviteSent) => {
    setInviteModalOpen(false);
  };

  if (!fetchFriends) {
    return null;
  }
  // add tripId to inviteModal as props
  return (
    <View style={styles.friendsContainer}>
      <Text style={styles.friendsTitle}>Friends</Text>
      <View style={styles.avatars}>
        {fetchFriends.map((friend) => {
          return (
            <Text style={styles.friendsName} key={friend.id}>
              {friend.data.name}
            </Text>
          );
        })}
        <Feather name='user' size={30} color='#93A7AA' />
        <TouchableOpacity onPress={() => setInviteModalOpen(true)}>
          <Feather name='user-plus' size={30} color='#2E5E4E' />
        </TouchableOpacity>
        <InviteModal
          tripId={tripId}
          show={inviteModalOpen}
          handleInviteModalClosure={handleInviteModalClosure}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  friendsContainer: {
    margin: 10,
  },
  friendsTitle: {
    textAlign: 'left',
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E5E4E',
    marginTop: 0,
  },
  friendsName: { color: '#2E5E4E' },
  avatars: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
});
