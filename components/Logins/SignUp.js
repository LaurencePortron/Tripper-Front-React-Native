import React, { useState } from 'react';
import { Button, Text, TextInput, View, StyleSheet } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useHistory } from 'react-router-native';

function SignUp(props) {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const history = useHistory();

  const getUsernameInput = (inputText) => {
    setRegisterUsername(inputText);
  };

  const getEmailInput = (inputText) => {
    setRegisterEmail(inputText);
  };

  const getPasswordInput = (inputText) => {
    setRegisterPassword(inputText);
  };

  var db = firebase.firestore();

  const handleRegisterSubmit = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(registerEmail, registerPassword)
      .then(() =>
        firebase
          .firestore()
          .collection('accounts')
          .doc(firebase.auth().currentUser.uid)
          .set({
            userName: registerUsername,
            email: registerEmail,
            password: registerPassword,
          })
      )
      .then(() => {
        history.push(`/dashboard`);
      })
      .catch((error) => {
        console.log('error when signing up', error);
      });
  };

  return (
    <View style={styles.signUpContainer}>
      <Text style={styles.welcomeTitle}>Welcome to Tripper &#129523;</Text>

      <Text style={styles.welcomeSubTitle}>Your holidays at a glance</Text>
      <View>
        <TextInput
          style={styles.inputStyle}
          type='text'
          textContentType='username'
          placeholder='Username'
          inputText={registerUsername}
          onChangeText={getUsernameInput}
          required
        />
        <TextInput
          style={styles.inputStyle}
          textContentType='emailAddress'
          name='email'
          placeholder='Email'
          inputText={registerEmail}
          onChangeText={getEmailInput}
          required
        />
        <TextInput
          style={styles.inputStyle}
          textContentType='newPassword'
          name='password'
          placeholder='Password'
          inputText={registerPassword}
          onChangeText={getPasswordInput}
          secureTextEntry={true}
          required
        />
        <Button
          style={styles.signUpButton}
          type='submit'
          value='submit'
          title='Sign Up'
          onPress={handleRegisterSubmit}
        ></Button>
      </View>
    </View>
  );
}

export default SignUp;

const styles = StyleSheet.create({
  inputStyle: {
    width: '100%',
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
    fontSize: 18,
  },
  welcomeSubTitle: {
    textAlign: 'center',
    color: '#4d4d4d',
    fontSize: 13,
    marginBottom: 10,
    marginTop: 10,
  },
  signUpContainer: {
    width: 200,
    margin: 0,
    marginTop: 0,
  },
});
