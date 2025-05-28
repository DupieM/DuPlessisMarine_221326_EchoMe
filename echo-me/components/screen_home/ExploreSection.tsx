import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ActionButton from './ActionButton';
import { useRouter } from 'expo-router';

const ExploreSection = () => {
  const router = useRouter(); // ✅ Move useRouter inside component

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Continue to Explore</Text>
      <ActionButton
        title="My Journey"
        backgroundColor="#ED4FB3"
        icon={require('../../assets/images/adaptive-icon.png')}
        onPress={() => router.push('/journey')} 
      />
      <ActionButton
        title="Showcase"
        backgroundColor="#47A9F5"
        icon={require('../../assets/images/adaptive-icon.png')}
        onPress={() => router.push('/showcase')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 20,
    color: 'white'
  },
});

export default ExploreSection;