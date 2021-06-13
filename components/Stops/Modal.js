import React, { useState } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

export default function ModalTester() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{ flex: 1, position: 'absolute' }}>
      <Button title='Show modal' onPress={toggleModal} />

      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1 }}>
          <Text style={styles.hello}>Hello!</Text>
        </View>
      </Modal>
      <Button title='Hide modal' onPress={toggleModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  hello: { color: 'black' },
});
