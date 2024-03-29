import React from 'react';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import firebase from 'firebase/app';

export default function SettleBalance({
  tripId,
  expenseId,
  verifySettledBalance,
}) {
  const db = firebase.firestore();

  const addSettleToDb = () => {
    db.collection('trips')
      .doc(tripId)
      .collection('expenses')
      .doc(expenseId)
      .update({
        amountSettled: true,
      });
  };

  return (
    <TouchableOpacity>
      {verifySettledBalance ? (
        <Feather name='check-circle' size={24} color='green' />
      ) : (
        <Feather
          name='check-circle'
          size={24}
          color='#9D9996'
          onPress={() => {
            addSettleToDb(expenseId);
          }}
        />
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({});
