import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Footer from '../Footer';
import { Feather } from '@expo/vector-icons';

export default function HelpCenter(props) {
  const [clickedOnQuestion, setClickedOnQuestion] = useState(false);

  const openAnswerOfQuestion = () => {
    setClickedOnQuestion(true);
  };
  const freqAskedQuestions = [
    {
      question: 'How can I add a trip?',
      answer: 'Go to your dashboard and click on plus.',
    },
    {
      question: 'How can I add an activity?',
      answer: 'Go to your trip and click on plus.',
    },
    {
      question: 'How can I invite friends?',
      answer:
        'Once on a trip clik on the plus avatar and enter the email address.',
    },
    {
      question: 'How can I change my password?',
      answer: 'Go to your accounts settings, then info in the menu.',
    },
    {
      question: 'How can I change my notification settings',
      answer: 'Go to your accounts settings, then notifcations in the menu.',
    },
  ];
  return (
    <View>
      <View style={styles.faqContainer}>
        <Text style={styles.sectionsTitle}>FAQ</Text>
        {freqAskedQuestions.map((freqAskedQuestion, index) => {
          return (
            <View key={index} style={styles.questionContainer}>
              <View style={styles.questionsSection}>
                <Text style={styles.question}>
                  {freqAskedQuestion.question}
                </Text>

                <Feather
                  name='chevron-down'
                  size={32}
                  color='black'
                  onPress={openAnswerOfQuestion}
                />
              </View>
              {clickedOnQuestion ? (
                <View style={styles.answersSection}>
                  <Text style={styles.answer}>{freqAskedQuestion.answer}</Text>
                  <Feather
                    name='chevron-up'
                    size={32}
                    color='black'
                    onPress={openAnswerOfQuestion}
                  />
                </View>
              ) : null}
            </View>
          );
        })}
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  faqContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    width: 300,
    height: 300,
    margin: 30,
  },
  sectionsTitle: {
    textAlign: 'left',
    fontSize: 20,
    marginTop: 10,
  },
  questionsSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  answersSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  questionContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  question: {
    fontSize: 20,
    color: 'black',
  },
});
