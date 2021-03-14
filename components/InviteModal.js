import React, { useState } from 'react';
import { View, StyleSheet, Modal, Text, TextInput, Button } from 'react-native';
import { Feather } from '@expo/vector-icons';
import API from '../services/API';

export default function InviteModal({ show, handleInviteModalClosure }) {
  const [getEmail, setGetEmail] = useState('');

  const getEmailInput = (inputText) => {
    setGetEmail(inputText);
  };

  const handleSendInvite = () => {
    API.post(`/invites`, {
      to: getEmail,
    });
  };

  return (
    <Modal
      visible={show}
      onRequestClose={() => handleInviteModalClosure()}
      style={styles.modalContainer}
    >
      <View style={styles.modalMainDisplay}>
        <Feather
          name='x-circle'
          size={30}
          color='black'
          onPress={() => handleInviteModalClosure()}
        />
        <Text style={styles.inviteText}>Who would you like to invite?</Text>
        <TextInput
          style={styles.addEmail}
          onChangeText={getEmailInput}
          inputText={getEmail}
          placeholder='Enter Email'
          name='title'
        />
        <Button
          onPress={() => {
            handleSendInvite();
          }}
          type='submit'
          method='post'
          action='/invites'
          title='Send Invite'
        ></Button>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  modalMainDisplay: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'absolute',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#eee',
    top: 30,
    left: 35,
    width: 300,
    padding: 10,
  },

  inviteText: {
    textAlign: 'left',
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E5E4E',
    marginTop: 0,
  },
  addEmail: {
    display: 'flex',
    padding: 15,
    borderWidth: 1,
    borderColor: '#2E5E4E',
    marginBottom: 15,
    margin: 10,
  },
});
