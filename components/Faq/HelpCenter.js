import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Footer from '../Footer';
import { Feather } from '@expo/vector-icons';
import { useFirestoreCollection } from '../hooks';
import firebase from 'firebase/app';

export default function HelpCenter(props) {
  var db = firebase.firestore();
  const [isExpanded, setIsExpanded] = useState(false);

  const fetchFaq = useFirestoreCollection(db.collection('faq'), []);

  const openAnswerOfQuestion = (faqiD) => {
    setIsExpanded(!isExpanded);
    fetchFaq.map((faq) => {
      const faqiD = faq.id;
      return (
        <View style={styles.answersSection}>
          <Text>{faq.data.answer}</Text>
        </View>
      );
    });
  };

  return (
    <View>
      <View style={styles.faqContainer}>
        <Text style={styles.sectionsTitle}>FAQ</Text>
        {fetchFaq.map((faq) => {
          return (
            <View style={styles.faq}>
              <View style={styles.questionsSection}>
                <Text style={styles.questions}>{faq.data.question}</Text>
                <Feather
                  name='chevron-down'
                  size={24}
                  color='black'
                  onPress={() => openAnswerOfQuestion(faq.id)}
                />
              </View>
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
    alignItems: 'flex-start',
    height: '100%',
    padding: 20,
  },
  sectionsTitle: {
    textAlign: 'left',
    marginBottom: 20,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2E5E4E',
  },

  questionsSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },

  questions: { fontSize: 20, fontWeight: 'bold' },
  answersSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 30,
    fontSize: 18,
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
