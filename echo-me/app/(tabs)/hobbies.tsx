import React, { useState } from 'react';
import { Image, StyleSheet, Platform, View, Text } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { HobbyDropdown } from '@/components/screen_hobbies/HobbyDropdown';
import { HobbyCard } from '@/components/screen_hobbies/HobbyCard';
import { ShowcaseData } from '@/components/screen_hobbies/HobbyPrompt'; // make sure this is correct

export default function HobbiesScreen() {
  const [selectedHobby, setSelectedHobby] = useState(ShowcaseData.Hobby[0]);

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <View style={styles.headerContent}>
          <Text style={styles.pageTitle}>My Hobbies</Text>
          <Text style={styles.descriptionText}>
            Here you can view a list of all the hobbies that I like to do in my free time.
          </Text>
        </View>

        <View style={styles.contentContainer}>
          <HobbyDropdown
            options={ShowcaseData.Hobby}
            onSelect={setSelectedHobby}
            selected={selectedHobby}
          />
          <HobbyCard
            imageSource={selectedHobby.image}
            description={selectedHobby.description}
          />
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}


const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
  },
  headerContent: {
    width: 300,
    height: 160,
    marginBottom: 20
  },
  pageTitle: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#1E1924',
    marginBottom: 10,
    textAlign: 'center',
    fontStyle: 'italic'
  },
  descriptionText: {
    fontSize: 23,
    color: '#1E1924',
    marginBottom: 20,
  },
  contentContainer: {
    width: 320,
    padding: 10,
    marginBottom: -40
  },
  headerImagePlaceholder: {
    height: 100, 
    width: '100%',
    backgroundColor: 'transparent', 
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});