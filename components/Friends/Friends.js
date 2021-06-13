import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import InviteModal from './InviteModal';
import { useFirestoreCollection } from '../hooks';
import firebase from 'firebase/app';
import Avatar from '../images/avatar.png';

export default function Friends({ tripId }) {
  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  const fetchFriends = useFirestoreCollection(
    firebase.firestore().collection('trips').doc(tripId).collection('friends'),
    [tripId]
  );

  const handleInviteModalClosure = () => {
    setInviteModalOpen(false);
  };

  if (!fetchFriends) {
    return null;
  }
  return (
    <View style={styles.friendsContainer}>
      <Text style={styles.friendsTitle}>Friends</Text>
      <View style={styles.avatars}>
        {fetchFriends.map((friend) => {
          return (
            <View>
              <Image source={Avatar} style={styles.avatarImage} />
              <Text style={styles.friendsName} key={friend.id}>
                {friend.data.name}
              </Text>
            </View>
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
    marginLeft: 20,
  },
  friendsTitle: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#93A7AA',
    marginTop: 0,
  },
  friendsName: { color: '#2E5E4E' },
  avatars: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    alignItems: 'center',
  },
  avatarImage: { width: 50, height: 50 },
});
