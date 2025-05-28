import { Image, StyleSheet, Platform, View, Text } from 'react-native'; // Added View
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { HobbyDropdown } from '@/components/screen_hobbies/HobbyDropdown';
import { HobbyCard } from '@/components/screen_hobbies/HobbyCard';


export default function HobbiesScreen() {
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
          <HobbyDropdown />
          <HobbyCard
            imageSource={require('../../assets/images/adaptive-icon.png')}
            description="Description of hobby"
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
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
    fontStyle: 'italic'
  },
  descriptionText: {
    fontSize: 23,
    color: 'white',
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