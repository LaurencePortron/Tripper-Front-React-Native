import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Footer from '../Footer';
import { COLORS } from '../colors.js';

export default function HelpCenter(props) {
  return (
    <View>
      <View style={styles.aboutContainer}>
        <View style={styles.aboutImageTextContainer}>
          <Image
            source={require('../images/about.jpg')}
            style={styles.aboutImage}
            alt='random'
          ></Image>
          <View style={styles.aboutDescriptionContainer}>
            <Text style={styles.aboutTitle}>About me </Text>
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
  aboutImage: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
    marginBottom: 350,
  },
  aboutTitle: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 30,
    color: COLORS.darkGreen,
    fontWeight: 'bold',
  },
  aboutDescriptionContainer: {
    backgroundColor: 'white',
    zIndex: 1,
    bottom: 0,
    width: '100%',
    height: 400,
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    position: 'absolute',
  },
});
