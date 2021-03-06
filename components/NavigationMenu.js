import React, { useState, useRef } from 'react';
import { Feather } from '@expo/vector-icons';
import { Animated, View, Easing, StyleSheet, Header } from 'react-native';
import NavigationMenuContent from './NavigationMenuContent';

export default function NavigationMenu(props) {
  const [menuIsOpen, setMenuIsOPen] = useState(false);
  const [animatedValue] = useState(() => new Animated.Value(1));

  const clickToOpenMenu = () => {
    setMenuIsOPen(true);

    Animated.timing(animatedValue, {
      toValue: 0.5,
      duration: 1200,
      useNativeDriver: false,
      easing: Easing.ease,
    }).start();
  };
  const clickToCloseMenu = () => {
    setMenuIsOPen(false);

    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: false,
      easing: Easing.ease,
    }).start();
  };
  return (
    <View style={styles.navigationMenuCon} name='menubar'>
      {menuIsOpen ? (
        <NavigationMenuContent clickToCloseMenu={clickToCloseMenu} />
      ) : null}
      <Animated.View
        style={[
          styles.navigationMenuContainer,
          {
            top: animatedValue,
          },
        ]}
      >
        <Feather
          name='menu'
          size={35}
          color='orange'
          style={styles.navigationMenu}
          onPress={clickToOpenMenu}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  navigationMenuContainer: {
    marginTop: 20,
    display: 'flex',
  },

  navigationMenuCon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10,
    position: 'absolute',
  },
  navigationMenu: {
    display: 'flex',
    flexDirection: 'row',
  },
});
