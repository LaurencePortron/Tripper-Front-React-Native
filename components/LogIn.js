import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
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
    <View
      style={{
        width: 200,
        margin: 0,
        marginTop: 0,
      }}
    >
      <Text
        style={{
          textAlign: 'center',
          color: '#4d4d4d',
          fontSize: 18,
        }}
      >
        Welcome to Tripper &#129523;
      </Text>

      <Text
        style={{
          textAlign: 'center',
          color: '#4d4d4d',
          fontSize: 13,
          marginBottom: 10,
          marginTop: 10,
        }}
      >
        Your holidays at a glance
      </Text>
      <View>
        <TextInput
          style={{
            width: '100%',
            padding: 15,
            borderWidth: 1,
            borderColor: '#dddddd',
            marginBottom: 15,
          }}
          type='text'
          name='username'
          placeholder='Username'
          inputText={getUsername}
          onChangeText={handleUsername}
          required
        />
        <TextInput
          style={{
            width: '100%',
            padding: 15,
            borderWidth: 1,
            borderColor: '#dddddd',
            marginBottom: 15,
          }}
          type='password'
          name='password'
          placeholder='Password'
          inputText={getPassword}
          onChangeText={handlePassword}
          required
        />
        <Button
          type='submit'
          value='submit'
          title='Log In'
          onPress={handleLogin}
          style={{
            width: ' 100%',
            padding: 15,
            backgroundColor: '#535b63',
            border: 0,
            color: '#ffffff',
          }}
        ></Button>
      </View>
    </View>
  );
}

export default LogIn;
