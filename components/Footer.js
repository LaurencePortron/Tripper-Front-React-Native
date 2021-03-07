import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useHistory } from 'react-router-native';
import { Feather } from '@expo/vector-icons';

export default function Footer(props) {
  const history = useHistory();

  return (
    <View style={styles.footer}>
      <View style={styles.menuItems}>
        <Feather
          name='home'
          size={25}
          color='#2E5E4E'
          style={styles.arrowClose}
        />
        <Feather
          name='arrow-left-circle'
          size={25}
          color='#2E5E4E'
          style={styles.arrowClose}
        />
        <Feather
          name='arrow-left-circle'
          size={25}
          color='#2E5E4E'
          style={styles.arrowClose}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  footer: {
    width: '100%',
    height: 50,
    backgroundColor: '#B37650',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  menuItems: {
    display: 'flex',
    flexDirection: 'row',
  },
});
