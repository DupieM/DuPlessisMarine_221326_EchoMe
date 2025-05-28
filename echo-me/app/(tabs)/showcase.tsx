import { Image, StyleSheet, Platform, View, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ShowcaseScreen() {
  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <View style={styles.headerContent}>
          <Text style={styles.pageTitle}>Showcase</Text>
          <Text style={styles.descriptionText}>
            Explore my unique style through the various projects I have done.
          </Text>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
});
