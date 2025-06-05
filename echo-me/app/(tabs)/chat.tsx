import { Image, StyleSheet, Platform, View, Text } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ChatCard } from '@/components/screen_chat/ChatCard';

export default function TabTwoScreen() {

  // Renders the main UI for the Chat screen, displaying a title, description, and the ChatCard component.
  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <View style={styles.headerContent}>
          <Text style={styles.pageTitle}>Chat</Text>
          <Text style={styles.descriptionText}>
            Let’s chat about my journey, help you discover career opportunities, or find the right resources to support you.
          </Text>
        </View>

        <View style={styles.contentContainer}>
          <ChatCard />
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

// Defines the stylesheets for the components.
const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
  },
  headerContent: {
    width: 300,
    height: 160,
    marginBottom: 30
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
    fontSize: 22,
    color: '#1E1924',
    marginBottom: 40,
    textAlign: 'left'
  },
  contentContainer: {
    width: 320,
    padding: 10,
    marginBottom: -40
  },
});