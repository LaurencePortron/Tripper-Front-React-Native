import React from 'react';
import { Feather } from '@expo/vector-icons';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

export default function Friends(props) {
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
  return (
    <ScrollView>
      <Text style={styles.friendsTitle}>Friends</Text>
      <View style={styles.avatars}>
        <Feather name='user' size={30} color='black' />
        <Feather name='user' size={30} color='black' />
        <Feather name='user-plus' size={30} color='black' />
      </View>
    </ScrollView>
  );
}
