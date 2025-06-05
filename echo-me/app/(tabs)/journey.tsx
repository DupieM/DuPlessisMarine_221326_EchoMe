import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { journeyData } from '@/components/screen_chat/ChatPrompt';
// @ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

type JourneyYear = '1st year' | '2nd year' | '3rd year' | 'Post-Graduete';
const tabs: JourneyYear[] = ['1st year', '2nd year', '3rd year', 'Post-Graduete'];
const screenWidth = Dimensions.get('window').width;

export default function JourneyScreen() {
  const [currentTab, setCurrentTab] = useState<JourneyYear>('1st year');
  const [progressIndex, setProgressIndex] = useState(0);
  const router = useRouter();
  const navigation = useNavigation();

  const prompts = [...journeyData[currentTab], '__last_slide__'];

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50,
  };

  const hasNavigated = useRef(false);

  const onViewableItemsChanged = React.useRef(({ viewableItems }: any) => {
  if (viewableItems.length > 0) {
    const index = viewableItems[0].index;
    if (index !== null) {
      setProgressIndex(index);
      saveProgress(index);
    }
  }
}).current;

  const saveProgress = async (index: number) => {
    await AsyncStorage.setItem('journeyProgress', JSON.stringify({ tab: currentTab, index }));
  };

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    const stored = await AsyncStorage.getItem('journeyProgress');
    if (stored) {
      const { tab, index } = JSON.parse(stored);
      setCurrentTab(tab);
      setProgressIndex(index);
    }
  };

  const handleGoToChat = (prompt: string) => {
    router.push({
      pathname: '/chat',
      params: { initialPrompt: prompt },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>My Journey</Text>
      <Text style={styles.descriptionText}>
        Let me guide you through the learning milestones that shaped my path through my studies.
        </Text>

      <View style={styles.box}>
        <View style={styles.tabContainer}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab}
              onPress={() => {
                setCurrentTab(tab);
                setProgressIndex(0);
              }}
            >
              <Text style={[styles.tabText, currentTab === tab && styles.activeTab]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Progress.Bar
          progress={(progressIndex + 1) / prompts.length}
          width={320}
          height={15}
          color="#5C319A"
          borderRadius={8}
          style={styles.progressBar}
        />

        <FlatList
          data={prompts}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          pagingEnabled
          initialScrollIndex={progressIndex}
          getItemLayout={(_, index) => ({
            length: screenWidth - 10,
            offset: (screenWidth - 30) * index,
            index,
          })}
          renderItem={({ item }) => {
            if (item === '__last_slide__') {
              return (
                <View style={[styles.promptBox, { backgroundColor: '#DDECF6' }]}>
                  <TouchableOpacity
                    style={[styles.chatButton, { marginTop: 20 }]}
                    onPress={() => router.push('/nextstep')}
                  >
                    <Text style={styles.buttonText}>Continue</Text>
                  </TouchableOpacity>
                </View>
              );
            }

            return (
              <View style={[styles.promptBox]}>
                <Text style={styles.promptText}>{item}</Text>
                <TouchableOpacity
                  style={styles.chatButton}
                  onPress={() => handleGoToChat(item)}
                >
                  <Text style={styles.buttonText}>Go to Chat</Text>
                </TouchableOpacity>
              </View>
            );
          }}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          showsHorizontalScrollIndicator={false}
        />

        <View style={styles.paginationContainer}>
          {prompts.slice(0, -1).map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === progressIndex && styles.activeDot,
              ]}
            />
          ))}
        </View>

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
    marginBottom: 9 
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
  carouselContainer: {
    flexDirection: 'row',
  },
  progressBarContainer: {
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  flatListContainer: {
    flex: 1,
  },
  verticalProgressBar: {
    transform: [{ rotate: '-90deg' }],
    marginRight: 10,
    marginTop: 70,
  },
  progressBar: { 
    marginVertical: 10 
  },
  promptBox: {
    marginTop: 5,
    width: 300,
    borderColor: '#9D9D9D',
    borderWidth: 2,
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 10,
    height: 350,
    justifyContent: 'center',
  },
  promptText: { 
    fontSize: 25, 
    textAlign: 'center', 
    color: '#3B3356' 
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D3CBEA',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#5C319A',
  },
  chatButton: {
    marginTop: 20,
    backgroundColor: '#F34BC0',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignSelf: 'center',
    height: 40
  },
  buttonText: { 
    color: '#F3ECE4',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17
  },
  swipeHint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  swipeHintText: {
    marginLeft: 6,
    color: '#5C319A',
    fontSize: 16,
    fontStyle: 'italic',
  },
});