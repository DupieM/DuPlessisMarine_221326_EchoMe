import React from 'react';
import { View, Text, Image, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const router = useRouter();

  // Renders the main home screen content, including an introduction, description, and navigation buttons.
  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <View style={styles.textcontainer}>
          <Image source={require('../../assets/images/Avatar.png')} style={styles.image} />
          <Text style={styles.text}>
            <Text style={styles.hi}>Hi, I’m{'\n'}</Text>
            <Text style={styles.name}>Lila Botha</Text>
          </Text>
        </View>

        <View style={styles.descriptioncontainer}>
          <Text style={styles.description}>
            Need study tips, creative ideas, or career advice? I’m here to help!
            Follow along as I share my journey from uni to postgrad and feel free
            to ask questions or chat about your goals anytime.
          </Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>Continue to Explore</Text>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/journey')}>
            <Text style={styles.texttwo}>My Journey</Text>
            <Image source={require('../../assets/images/Books.png')} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttontwo} onPress={() => router.push('/showcase')}>
            <Text style={styles.texttwo}>Showcase</Text>
            <Image source={require('../../assets/images/art.png')} style={styles.icontwo} />
          </TouchableOpacity>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

// Defines the stylesheets for the components.
const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    backgroundColor: '#A6BCE6'
  },
  textcontainer: {
    width: 340,
    height: 160
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 20,
    marginBottom: 12,
  },
  text: {
    textAlign: 'left',
    marginTop: -135,
    marginLeft: 180,
    color: '#1E1924'
  },
  hi: {
    fontSize: 30,
    fontStyle: 'italic',
    fontWeight: '500',
  },
  name: {
    fontSize: 36,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  descriptioncontainer: {
    marginTop: 17,
    width: 320
  },
  description: {
    fontSize: 22.5,
    textAlign: 'center',
    color: '#1E1924'
  },
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
  button: {
    width: '100%',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "#ED4FB3"
  },
  buttontwo: {
    width: '100%',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "#47A9F5"
  },
  texttwo: {
    fontSize: 25,
    color: '#000',
    fontWeight: '500',
  },
  icon: {
    width: 62,
    height: 62,
  },
  icontwo: {
    width: 70,
    height: 62,
  },
});