import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { journeyPrompt, journeyData } from '@/components/screen_chat/ChatPrompt';


// Define allowed journey years
type JourneyYear = '1st year' | '2nd year' | '3rd year' | 'Post-Graduete';

// Typed array of tabs
const tabs: JourneyYear[] = ['1st year', '2nd year', '3rd year', 'Post-Graduete'];

export default function JourneyScreen() {
  const [currentTab, setCurrentTab] = useState<JourneyYear>('1st year');
  const [progressIndex, setProgressIndex] = useState(0);
  const router = useRouter();

  const prompts = journeyData[currentTab];
  const currentPrompt = prompts[progressIndex];

  const saveProgress = async () => {
    await AsyncStorage.setItem('journeyProgress', JSON.stringify({ tab: currentTab, index: progressIndex }));
  };

  const loadProgress = async () => {
    const stored = await AsyncStorage.getItem('journeyProgress');
    if (stored) {
      const { tab, index } = JSON.parse(stored);
      setCurrentTab(tab);
      setProgressIndex(index);
    }
  };

  useEffect(() => {
    loadProgress();
  }, []);

  const handleProceed = () => {
    const nextIndex = progressIndex + 1;
    if (nextIndex < prompts.length) {
      setProgressIndex(nextIndex);
      saveProgress();
    } else {
      router.push('/nextstep'); // ✅ navigates to next screen
    }
  };

    const handlePrev = () => {
    if (progressIndex > 0) {
      setProgressIndex(progressIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>My Journey</Text>
      <Text style={styles.descriptionText}>Explore the various learning elements during my studies</Text>
      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity key={tab} onPress={() => {
            setCurrentTab(tab);
            setProgressIndex(0);
          }}>
            <Text style={[styles.tabText, currentTab === tab && styles.activeTab]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>


      <View style={styles.box}>
        <Progress.Bar
          progress={(progressIndex + 1) / prompts.length}
          width={320}
          height={15}
          color="#5C319A"
          borderRadius={8}
          style={styles.progressBar}
        />
        <Text style={styles.percentText}>
          {Math.round(((progressIndex + 1) / prompts.length) * 100)}%
        </Text>

        <View style={styles.promptBox}>
          <Text style={styles.promptText}>{currentPrompt}</Text>
        </View>

        <TouchableOpacity onPress={handlePrev} disabled={progressIndex === 0} style={[styles.navButton, progressIndex === 0 && styles.disabled]}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 15, 
    backgroundColor: '#A6BCE6', 
    alignItems: 'center' 
  },
  pageTitle: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#1E1924',
    marginBottom: 10,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  descriptionText: {
    fontSize: 23,
    color: '#1E1924',
    marginBottom: 20,
    textAlign: 'left',
  },
  tabContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    width: '100%', 
    marginBottom: 20 
  },
  tabText: { 
    fontSize: 15,
    color: '#3B3356',
    paddingHorizontal: 8,
    fontStyle: 'italic'
  },
  activeTab: { 
    color: '#1E1924', 
    fontWeight: 'bold', 
    textDecorationLine: 'underline' 
  },
  box: {
    width: 360,
    backgroundColor: '#F3ECE4',
    padding: 20,
    marginBottom: -20
  },
  progressBar: { 
    marginVertical: 10 
  },
  percentText: { 
    fontSize: 14, 
    color: '#3B3356', 
    marginBottom: 10,
    textAlign: 'center'
  },
  promptBox: {
    borderColor: '#9D9D9D',
    borderWidth: 2,
    borderRadius: 12,
    padding: 20,
    marginTop: 10,
    minHeight: 120,
    justifyContent: 'center',
    width: '100%',
  },
  promptText: { 
    fontSize: 22, 
    textAlign: 'center', 
    color: '#3B3356' 
  },
  proceedButton: {
    width: 120,
    marginTop: 30,
    backgroundColor: '#F34BC0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginLeft: 100
  },
  buttonText: { 
    color: '#F3ECE4',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17
  },
   navButton: {
    backgroundColor: '#F34BC0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  disabled: {
    opacity: 0.3,
  },
});
