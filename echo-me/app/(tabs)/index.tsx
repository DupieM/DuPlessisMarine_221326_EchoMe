import React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ExploreSection from '@/components/home_screen/ExploreSection';

export default function HomeScreen() {
  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <View style={styles.textcontainer}>
          <Image source={require('../../assets/images/favicon.png')} style={styles.image} />
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

        <ExploreSection />
  
      </ThemedView>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
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
    color: 'white'
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
    color: 'white'
  }
});
