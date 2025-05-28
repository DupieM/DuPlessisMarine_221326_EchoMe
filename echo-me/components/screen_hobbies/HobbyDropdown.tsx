import React from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { MaterialIcons } from '@expo/vector-icons';

export function HobbyDropdown() {
  const handlePress = () => {
    console.log('Hobby Dropdown pressed!');
  };

  return (
    <Pressable onPress={handlePress} style={styles.dropdownButton}>
      <ThemedText style={styles.dropdownText}>Hobby Name</ThemedText>
      <MaterialIcons name="keyboard-arrow-down" size={24} color="white" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FF69B4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});