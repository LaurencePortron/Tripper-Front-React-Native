import React, { useState, useEffect } from 'react';
import API from '../services/API';
import BackToDashboardButton from './Buttons';
import {
  ScrollView,
  TextInput,
  StyleSheet,
  Text,
  Button,
  View,
} from 'react-native';

export default function Messages(props) {
  const [postIsClicked, setPostIsClicked] = useState(false);
  const [writePost, setWritePost] = useState('');
  const [fetchPosts, setFetchPosts] = useState([]);

  const getMessageInput = (inputText) => {
    setWritePost(inputText);
  };

  const postMessage = () => {
    setPostIsClicked(true);
  };

  const clickToAddPost = async () => {
    await API.post(`/messages`, {
      message: writePost,
    });
    postMessage();
    loadMessages();
  };

  const loadMessages = () => {
    API.get(`/messages`).then((res) => {
      setFetchPosts(res.data);
      console.log(res.data);
    });
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <ScrollView>
      <BackToDashboardButton />
      <Text style={styles.newFeature}>Coming soon! </Text>
      {postIsClicked ? (
        <Text style={styles.messages}>
          <Text style={styles.messageBlue}>
            {fetchPosts.map((fetchPost) => {
              return <p>{fetchPost.message}</p>;
            })}
          </Text>
        </Text>
      ) : (
        <View style={styles.messages}>
          <Text style={styles.addInfo}>
            <Text>Keep your friends posted </Text> &#x1f468;
            <TextInput
              name='message'
              inputText={writePost}
              onChangeText={getMessageInput}
            />
            <Text onPress={clickToAddPost}> Post </Text>
          </Text>
        </View>
      )}
      <View style={styles.addInfo}>
        {fetchPosts.map((fetchPost) => {
          return (
            <View>
              <Text style={styles.messageBlue}>{fetchPost.message}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  newFeature: { textAlign: 'center' },
  messages: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
    marginBottom: 10,
    color: '#38516d',
    fontWeight: 'bold',
  },
  messageBlue: {
    position: 'relative',
    marginLeft: 20,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#85959f',
    width: 200,
    height: 50,
    textAlign: 'left',
    borderWidth: 1,
    borderColor: '#85959f',
    borderRadius: 10,
  },
  addInfo: {},
  message: {},
  button: {
    width: 20,
    padding: 5,
    backgroundColor: '#535b63',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  arrow: {
    marginTop: 20,
  },
});
