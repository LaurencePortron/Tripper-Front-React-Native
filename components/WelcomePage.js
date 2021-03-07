import React from 'react';
import {
  ImageBackground,
  Button,
  StyleSheet,
  Text,
  View,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import { useHistory } from 'react-router-native';

export default function WelcomePage(props) {
  const history = useHistory();

  const goToLogin = () => {
    history.push(`/login`);
  };

  const goToSignUp = () => {
    history.push(`/signup`);
  };

  return (
    <ImageBackground
      source={require('./images/login.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.welcomeTitle}>Welcome to Tripper &#129523;</Text>
        <Text style={styles.welcomeDescription}>Your holidays at a glance</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={goToLogin}>
          <Text style={styles.button}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToSignUp}>
          <Text style={styles.button}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  welcomeTitle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 100,
  },
  welcomeDescription: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    marginTop: 10,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 300,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    color: '#B37650',
    margin: 3,
    fontSize: 15,
    width: 100,
    fontWeight: 'bold',
    borderColor: '#B37650',
    borderWidth: 1,
  },
});
