import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Image, StyleSheet, Text } from 'react-native';
import NavigationMenuContent from './NavigationMenuContent';

export default function NavigationMenu(props) {
  const [menuIsOpen, setMenuIsOPen] = useState(false);

  const clickToOpenMenu = () => {
    setMenuIsOPen(true);
  };
  const clickToCloseMenu = () => {
    setMenuIsOPen(false);
  };
  return (
    <View style={styles.dashboardScrollView}>
      {menuIsOpen ? (
        <NavigationMenuContent clickToCloseMenu={clickToCloseMenu} />
      ) : null}

      <Feather
        name='menu'
        size={35}
        color='white'
        style={styles.navigationMenu}
        onPress={clickToOpenMenu}
      />
      <Image
        source={require('./images/avatar.png')}
        style={styles.myTripsTitleAvatar}
        alt='random'
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  navigationMenu: {
    display: 'flex',
    flexDirection: 'row',
  },
  dashboardScrollView: {
    display: 'flex',
    flexDirection: 'row',
    zIndex: 1,
    backgroundColor: '#2E5E4E',
    padding: 20,
  },
  myTripsTitleAvatar: {
    marginTop: 5,
    marginLeft: 270,
    width: 30,
    height: 30,
  },
});
