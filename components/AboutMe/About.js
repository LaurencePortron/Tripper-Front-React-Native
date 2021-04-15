import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Footer from '../Footer';

export default function HelpCenter(props) {
  return (
    <View>
      <View style={styles.aboutContainer}>
        <View style={styles.aboutImageTextContainer}>
          <Text style={styles.aboutTitle}>About me </Text>
          <Image
            source={require('../images/about.jpg')}
            style={styles.aboutImage}
            alt='random'
          ></Image>
          <View style={styles.aboutDescriptionContainer}>
            <Text style={styles.aboutText}>
              Basically all abiout this here is my first try. Everything is
              divided into different sections Those are about myself, my Travels
              and the places I stayed. It's great since I haven't done this
              before, it is a good opportunity to see how I can do this.
            </Text>
          </View>
        </View>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  aboutImageTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  aboutText: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  aboutImage: { width: 300, height: 300, borderRadius: 20 },
  aboutTitle: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 25,
    marginLeft: 20,
    color: '#2E5E4E',
    fontWeight: 'bold',
  },
  aboutDescriptionContainer: { margin: 20 },
});
