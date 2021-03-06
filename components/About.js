import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import AccountHeader from './AccountHeader';

export default function HelpCenter(props) {
  return (
    <ScrollView>
      <AccountHeader />
      <View>
        <View style={styles.aboutImageTextContainer}>
          <Text style={styles.aboutText}>This is me </Text>
          <Image
            source={require('./images/about.jpg')}
            style={styles.aboutImage}
            alt='random'
          ></Image>
          <Text style={styles.aboutText}>
            Basically all abiout this here is my first try. Everything is
            divided into different sections Those are about myself, my Travels
            and the places I stayed. It's great since I haven't done this
            before, it is a good opportunity to see how I can do this. But let's
            be serious, we can talk about me some more but we are better off
            just starting right away. So here we go!
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  aboutImageTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  aboutText: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  aboutImage: { width: 300, height: 300 },
});
