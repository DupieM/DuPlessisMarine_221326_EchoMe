import React from 'react';
import { SafeAreaView, StyleSheet, ActivityIndicator, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams } from 'expo-router';

export default function ShowcaseWebViewScreen() {
  // Retrieves parameters from the URL, specifically the 'url' to be loaded in the WebView.
  const { url } = useLocalSearchParams();

  // Displays an error message if no URL is provided.
  if (!url) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: URL not provided.</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Ensures 'url' is treated as a string, handling cases where it might be an array.
  const uriString = Array.isArray(url) ? url[0] : url;

  // Renders a WebView to display the provided URL, including a loading indicator and error handling.
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: uriString }}
        style={styles.webview}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#5C319A" />
          </View>
        )}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
      />
    </SafeAreaView>
  );
}

// Defines the stylesheets for the components.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A6BCE6',
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFCCCC',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});