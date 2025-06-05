import React from 'react';
import { StyleSheet, View, ImageSourcePropType, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Defines the props for the HobbyCard component.
interface HobbyCardProps {
  imageSource: ImageSourcePropType;
  description: string;
}

export function HobbyCard({ imageSource, description }: HobbyCardProps) {
  // Renders a card displaying a hobby image and its description.
  return (
    <ThemedView style={styles.cardContainer}>
      <Image source={imageSource} style={styles.hobbyImage} />
      <ThemedText style={styles.description}>{description}</ThemedText>
    </ThemedView>
  );
}

// Defines the stylesheets for the components.
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#F3ECE4',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    height: 380
  },
  hobbyImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
    resizeMode: 'contain',
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});