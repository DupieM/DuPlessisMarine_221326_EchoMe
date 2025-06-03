import React from 'react';
import { SafeAreaView, StyleSheet, ActivityIndicator, View, Text } from 'react-native'; // <--- Make sure Text is here
import { WebView } from 'react-native-webview';
import { useLocalSearchParams } from 'expo-router'; // Import useLocalSearchParams

export default function ShowcaseWebViewScreen() {
  const { url } = useLocalSearchParams(); // Get parameters from the URL

  if (!url) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: URL not provided.</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Ensure 'url' is treated as a string, as useLocalSearchParams can return string | string[]
  const uriString = Array.isArray(url) ? url[0] : url;

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: uriString }}
        style={styles.webview}
        // Optional: Add a loading indicator
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#5C319A" />
          </View>
        )}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
          // You could display a user-friendly error message within the WebView or navigate back
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A6BCE6', // Or match your app's background
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