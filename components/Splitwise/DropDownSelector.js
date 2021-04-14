import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFirestoreCollection } from '../hooks';
import firebase from 'firebase/app';
import { Feather } from '@expo/vector-icons';

export default function DropDownSelector({ tripId }) {
  const [dropdownIsClicked, setDropdownIsClicked] = useState(false);
  const [friendSelected, setFriendSelected] = useState();

  const fetchFriends = useFirestoreCollection(
    firebase.firestore().collection('trips').doc(tripId).collection('friends'),
    [tripId]
  );

  const openDropDownSelection = () => {
    setDropdownIsClicked(true);
  };

  const closeDropDownSelection = () => {
    setDropdownIsClicked(false);
  };

  const selectFriendToExpense = (e) => {
    let value = friendSelected(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFriendSelected({ values: value });
  };

  console.log('moien', friendSelected);

  return (
    <TouchableOpacity
      style={styles.dropDownBox}
      onPress={openDropDownSelection}
    >
      {dropdownIsClicked ? (
        <View>
          {fetchFriends.map((friend) => {
            return (
              <TouchableOpacity key={friend.id}>
                <Text
                  multiple={true}
                  onPress={selectFriendToExpense}
                  value={friendSelected}
                >
                  {friend.data.name}
                </Text>
              </TouchableOpacity>
            );
          })}
          <Feather name='chevron-up' size={20} color='black' />
        </View>
      ) : (
        <View>
          {friendSelected ? (
            friendSelected
          ) : (
            <View style={styles.participants}>
              <Text>Participants</Text>
              <Feather name='chevron-down' size={20} color='black' />
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  dropDownBox: {
    color: '#2E5E4E',
    display: 'flex',
    padding: 15,
    borderWidth: 1,
    borderColor: '#535b63',
    marginBottom: 15,
    margin: 10,
  },
  dropDown: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  friendsDropDown: {
    display: 'flex',
    flexDirection: 'column',
  },
  participants: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

// create a field on whcih you can click
// if you clicked then show all friends attahced to trip
// on click of friends state should be updated an take an array of selected friends as new state
