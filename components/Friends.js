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

export default function Friends(props) {
  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  const handleInviteModalClosure = (inviteSent) => {
    setInviteModalOpen(false);
  };

  return (
    <ScrollView>
      <Text style={styles.friendsTitle}>Friends</Text>
      <View style={styles.avatars}>
        <Feather name='user' size={30} color='#93A7AA' />
        <Feather name='user' size={30} color='#93A7AA' />
        <TouchableOpacity onPress={() => setInviteModalOpen(true)}>
          <Feather name='user-plus' size={30} color='#2E5E4E' />
        </TouchableOpacity>
        <InviteModal
          show={inviteModalOpen}
          handleInviteModalClosure={handleInviteModalClosure}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  friendsTitle: {
    textAlign: 'left',
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#38516d',
    marginTop: 0,
  },
  avatars: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
});
