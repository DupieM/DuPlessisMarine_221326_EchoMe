import { Image, StyleSheet, Platform, View, Text } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {

  // Code to fetch prompts from journey page to talk about

  // API Call
  

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <View style={styles.headerContent}>
          <Text style={styles.pageTitle}>Chat</Text>
          <Text style={styles.descriptionText}>
            Here you can talk to aks about career opportunities, resources to use and receive advice or guidance.
          </Text>
        </View>

        <View>

        </View>

      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
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
    fontSize: 22,
    color: 'white',
    marginBottom: 20,
  },
});