import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function DropDownSelector({
  values,
  onValueChange,
  dropDownText,
  options,
}) {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setDropdownIsOpen(!dropdownIsOpen)}>
        <Text>{dropDownText}</Text>
      </TouchableOpacity>
      {dropdownIsOpen ? (
        <View>
          {options.map((option) => {
            const selected = values.includes(option.id);
            return (
              <TouchableOpacity
                key={option.id}
                onPress={() => {
                  onValueChange(
                    selected
                      ? values.filter((v) => v !== option.id)
                      : [...values, option.id]
                  );
                }}
              >
                <Text>
                  {selected ? <Text>[X]</Text> : null} {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({});
