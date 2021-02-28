import React, { useState } from 'react';
import { Button, Text, TextInput, View, StyleSheet } from 'react-native';
import API from '../services/API';
import { useHistory } from 'react-router-native';

function LogIn(props) {
  const [postUser, setPostUser] = useState([]);
  const [getUsername, setGetUsername] = useState('');
  const [getPassword, setGetPassword] = useState('');
  const history = useHistory();

  const handleUsername = (inputText) => {
    setGetUsername(inputText);
  };

  const handlePassword = (inputText) => {
    setGetPassword(inputText);
  };

  const navigateToSignUp = () => {
    history.push(`/signup`);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    API.post('/login', { username: getUsername, password: getPassword }).then(
      (res) => {
        setPostUser(res.data);
        history.push('/dashboard');
      },
      (err) => {
        console.log(err);
        alert('wrong credentials');
      }
    );
  };

  return (
    <View style={styles.signUpContainer}>
      <Text style={styles.welcomeTitle}>Welcome to Back &#129523;</Text>

      <View>
        <TextInput
          style={styles.inputStyle}
          type='text'
          name='username'
          placeholder='Username'
          inputText={getUsername}
          onChangeText={handleUsername}
          required
        />
        <TextInput
          style={styles.inputStyle}
          type='text'
          name='password'
          placeholder='Password'
          inputText={getPassword}
          onChangeText={handlePassword}
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
    marginBottom: 30,
  },

  signUpContainer: {
    width: 200,
    margin: 0,
    marginTop: 0,
  },
  SignUpText: {
    textDecorationLine: 'underline',
  },
});
