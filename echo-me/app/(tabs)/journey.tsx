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

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>My Journey</Text>
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

      <Progress.Bar
        progress={(progressIndex + 1) / prompts.length}
        width={300}
        height={10}
        color="#ba1fa4"
        borderRadius={5}
        style={styles.progressBar}
      />
      <Text style={styles.percentText}>
        {Math.round(((progressIndex + 1) / prompts.length) * 100)}%
      </Text>

      <View style={styles.promptBox}>
        <Text style={styles.promptText}>{currentPrompt}</Text>
      </View>

      <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: 'white', 
    alignItems: 'center' 
  },
  pageTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  tabContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    width: '100%', marginBottom: 20 
  },
  tabText: { 
    fontSize: 14, 
    color: '#888', 
    paddingHorizontal: 8 
  },
  activeTab: { 
    color: '#ba1fa4', 
    fontWeight: 'bold', 
    textDecorationLine: 'underline' 
  },
  progressBar: { 
    marginVertical: 10 
  },
  percentText: { 
    fontSize: 12, 
    color: '#666', 
    marginBottom: 10 
  },
  promptBox: {
    borderColor: '#ba1fa4',
    borderWidth: 2,
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    backgroundColor: '#fff',
    minHeight: 120,
    justifyContent: 'center',
    width: '100%',
  },
  promptText: { 
    fontSize: 16, 
    textAlign: 'center', 
    color: '#333' 
  },
  proceedButton: {
    marginTop: 30,
    backgroundColor: '#ba1fa4',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonText: { 
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
});
