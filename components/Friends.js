import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import InviteModal from './InviteModal';

export default function Friends({ tripId }) {
  console.log(tripId);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  const handleInviteModalClosure = (inviteSent) => {
    setInviteModalOpen(false);
  };
  // add tripId to inviteModal as props
  return (
    <View style={styles.friendsContainer}>
      <Text style={styles.friendsTitle}>Friends</Text>
      <View style={styles.avatars}>
        <Feather name='user' size={30} color='#93A7AA' />
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
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  friendsTitle: {
    textAlign: 'left',
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E5E4E',
    marginTop: 0,
  },
  avatars: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
});
