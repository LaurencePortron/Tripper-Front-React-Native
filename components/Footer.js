import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useHistory } from 'react-router-native';
import { Feather } from '@expo/vector-icons';

export default function Footer(props) {
  const history = useHistory();

  const backToHome = () => {
    history.push(`/dashboard`);
  };
  return (
    <View style={styles.footer}>
      <View style={styles.menuItems}>
        <Feather
          onPress={backToHome}
          name='home'
          size={25}
          color='#9D9996'
          style={styles.arrowClose}
        />
        <Feather
          name='arrow-left-circle'
          size={25}
          color='#9D9996'
          style={styles.arrowClose}
        />
        <Feather
          name='arrow-left-circle'
          size={25}
          color='#9D9996'
          style={styles.arrowClose}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  footer: {
    width: '100%',
    height: 60,
    backgroundColor: '#ececec',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  menuItems: {
    display: 'flex',
    flexDirection: 'row',
  },
});
