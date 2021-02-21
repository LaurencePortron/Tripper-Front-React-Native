import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

function LogIn(props) {
  // const [postUser, setPostUser] = useState([]);
  const [getUsername, setGetUsername] = useState('');
  const [getPassword, setGetPassword] = useState('');

  const handleUsername = (e) => {
    setGetUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setGetPassword(e.target.value);
  };

  // const handleLogin = (event) => {
  //   event.preventDefault();
  //   API.post('/login', { username: getUsername, password: getPassword }).then(
  //     (res) => {
  //       setPostUser(res.data);
  //       console.log(res);
  //       window.location.href = '/dashboard';
  //     },
  //     (err) => {
  //       alert('wrong credentials');
  //     }
  //   );
  // };

  return (
    <View className='login-form'>
      <Text>Welcome to Tripper &#129523;</Text>
      <Text>Your holidays at a glance</Text>
      <View>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
          }}
          type='text'
          name='username'
          placeholder='Username'
          value={getUsername}
          onChangeText={handleUsername}
          required
        />
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
          }}
          type='password'
          name='password'
          placeholder='Password'
          value={getPassword}
          onChangeText={handlePassword}
          required
        />
        <Button type='submit' value='submit' title='Log In'></Button>
      </View>
    </View>
  );
}

export default LogIn;
