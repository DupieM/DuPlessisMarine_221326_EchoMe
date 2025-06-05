import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Defines the props for the HobbyDropdown component.
interface HobbyDropdownProps {
  options: { name: string }[];
  onSelect: (item: any) => void;
  selected: any;
}

export function HobbyDropdown({ options, onSelect, selected }: HobbyDropdownProps) {
  // Renders a dropdown picker for selecting hobbies from a list of options.
  return (
    <View style={styles.dropdownContainer}>
      <Picker
        selectedValue={selected.name}
        onValueChange={(itemValue) => {
          const selectedOption = options.find(opt => opt.name === itemValue);
          if (selectedOption) onSelect(selectedOption);
        }}
        style={styles.picker}
      >
        {options.map((option, index) => (
          <Picker.Item key={index} label={option.name} value={option.name} />
        ))}
      </Picker>
    </View>
  );
}

// Defines the stylesheets for the components.
const styles = StyleSheet.create({
  dropdownContainer: {
    backgroundColor: '#FF69B4',
    borderRadius: 25,
    marginBottom: 20,
  },
  picker: {
    color: 'white',
    paddingHorizontal: 20,
  },
});