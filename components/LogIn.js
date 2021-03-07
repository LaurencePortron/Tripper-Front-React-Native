import React, { useState } from 'react';
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import 'firebase/auth';
import firebase from 'firebase/app';

import { useHistory } from 'react-router-native';

function LogIn(props) {
  const [getEmail, setGetEmail] = useState('');
  const [getPassword, setGetPassword] = useState('');
  const history = useHistory();

  const handleEmail = (inputText) => {
    setGetEmail(inputText);
  };

  const handlePassword = (inputText) => {
    setGetPassword(inputText);
  };

  const navigateToSignUp = () => {
    history.push(`/signup`);
  };

  const handleLogin = (event) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(getEmail, getPassword)
      .then(() => {
        history.push(`/dashboard`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.signUpContainer}>
      <Text style={styles.welcomeTitle}>Sign in &#129523;</Text>

      <View style={styles.container}>
        <TextInput
          style={styles.inputStyle}
          textContentType='emailAddress'
          name='username'
          placeholder='Username'
          inputText={getEmail}
          onChangeText={handleEmail}
          required
        />
        <TextInput
          style={styles.inputStyle}
          textContentType='password'
          name='password'
          placeholder='Password'
          inputText={getPassword}
          onChangeText={handlePassword}
          secureTextEntry={true}
          required
        />
        <Text style={styles.SignUpText} onPress={navigateToSignUp}>
          Sign Up here
        </Text>
        <Button
          style={styles.signUpButton}
          type='submit'
          value='submit'
          title='Log In'
          onPress={handleLogin}
        ></Button>
      </View>
    </View>
  );
}

export default LogIn;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputStyle: {
    width: '60%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#dddddd',
    marginBottom: 15,
  },
  signUpButton: {
    width: ' 100%',
    padding: 15,
    backgroundColor: '#535b63',
    color: '#ffffff',
  },
  welcomeTitle: {
    textAlign: 'center',
    color: '#4d4d4d',
    fontSize: 30,
    marginBottom: 30,
    marginTop: 40,
  },

  signUpContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  SignUpText: {
    textDecorationLine: 'underline',
  },
});
