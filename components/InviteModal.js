import React from 'react';
import { View, StyleSheet, Modal, Text, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function InviteModal({ show, handleInviteModalClosure }) {
  const clickToInvite = () => {
    sendInvite();
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
          placeholder='Enter Email'
          name='title'
        />
        <View
          onPress={() => {
            clickToInvite();
          }}
          type='submit'
        ></View>
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
  modalMainNoDisplay: {
    display: 'none',
  },
  inviteText: {
    textAlign: 'left',
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#38516d',
    marginTop: 0,
  },
  addEmail: {
    display: 'flex',
    padding: 15,
    borderWidth: 1,
    borderColor: '#535b63',
    marginBottom: 15,
    margin: 10,
  },
});
