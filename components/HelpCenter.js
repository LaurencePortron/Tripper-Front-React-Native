import React, { useState } from 'react';
import {
  TextInput,
  View,
  Button,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AccountHeader from './AccountHeader';
import { Feather } from '@expo/vector-icons';

export default function HelpCenter(props) {
  const [clickedOnQuestion, setClickedOnQuestion] = useState(false);

  const openAnswerOfQuestion = () => {
    setClickedOnQuestion(true);
  };
  return (
    <ScrollView>
      <AccountHeader />
      <View>
        <Text style={styles.sectionsTitle}>FAQ</Text>
        <View style={styles.questionsSection}>
          <View style={styles.questionContainer}>
            <Text style={styles.question}>How can I add a trip?</Text>
            <Feather
              name='chevron-down'
              size={32}
              color='black'
              onPress={openAnswerOfQuestion}
            />
          </View>

          <Text>{clickedOnQuestion ? 'weell just liek this' : null}</Text>
          <Text style={styles.question}>How can I add an activity?</Text>
          <Text style={styles.question}>How can I change my password?</Text>
          <Text style={styles.question}>How can I invite friends?</Text>
          <Text style={styles.question}>How Can I add a trip?</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sectionsTitle: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
  },
  questionsSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  questionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  question: {
    fontSize: 20,
  },
});
