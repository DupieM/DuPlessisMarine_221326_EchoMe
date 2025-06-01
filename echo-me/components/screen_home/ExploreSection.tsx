import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ActionButton from './ActionButton';
import { useRouter } from 'expo-router';
import ActionButtonTwo from './ActionButtonTwo';

const ExploreSection = () => {
  const router = useRouter(); // ✅ Move useRouter inside component

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Continue to Explore</Text>
      <ActionButton
        title="My Journey"
        backgroundColor="#ED4FB3"
        icon={require('../../assets/images/Books.png')}
        onPress={() => router.push('/journey')}
      />
      <ActionButtonTwo
        title="Showcase"
        backgroundColor="#47A9F5"
        icon={require('../../assets/images/art.png')}
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
    color: '#1E1924'
  },
});

export default ExploreSection;