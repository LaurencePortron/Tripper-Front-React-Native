import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useHistory } from 'react-router-native';
import { Feather } from '@expo/vector-icons';

export default function Footer(props) {
  const history = useHistory();

  const backToHome = () => {
    history.push(`/dashboard`);
  };

  const navigateToProfile = () => {
    history.push(`/myprofile`);
  };

  const navigateToHelpCenter = () => {
    history.push(`/helpCenter`);
  };

  const navigateToAbout = () => {
    history.push(`/about`);
  };

  return (
    <View style={styles.footer}>
      <View style={styles.menuItems}>
        <View style={styles.item}>
          <Feather
            onPress={backToHome}
            name='home'
            size={25}
            color='#9D9996'
            style={styles.arrowClose}
          />
        </View>
        <View style={styles.item}>
          <Feather
            onPress={navigateToProfile}
            name='settings'
            size={25}
            color='#9D9996'
            style={styles.arrowClose}
          />
        </View>
        <View style={styles.item}>
          <Feather
            onPress={navigateToHelpCenter}
            name='help-circle'
            size={25}
            color='#9D9996'
            style={styles.arrowClose}
          />
        </View>
        <View style={styles.item}>
          <Feather
            onPress={navigateToAbout}
            name='info'
            size={25}
            color='#9D9996'
            style={styles.arrowClose}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  footer: {
    width: '100%',
    height: '10%',
    backgroundColor: '#ececec',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  menuItems: {
    display: 'flex',
    flexDirection: 'row',
  },

  item: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 30,
  },
});
