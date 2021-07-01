import React, { useState } from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import firebase from 'firebase/app';

export default function Toggle(props) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: '#767577', true: '#93A7AA' }}
        thumbColor={isEnabled ? '#2E5E4E' : '#f4f3f4'}
        ios_backgroundColor='#3e3e3e'
        onValueChange={() => {
          toggleSwitch();
        }}
        value={isEnabled}
        style={styles.toggle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggle: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
  },
});
