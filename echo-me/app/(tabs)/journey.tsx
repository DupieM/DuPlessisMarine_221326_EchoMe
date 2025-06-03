import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { journeyData } from '@/components/screen_chat/ChatPrompt';

type JourneyYear = '1st year' | '2nd year' | '3rd year' | 'Post-Graduete';
const tabs: JourneyYear[] = ['1st year', '2nd year', '3rd year', 'Post-Graduete'];
const { width } = Dimensions.get('window');

export default function JourneyScreen() {
  const [currentTab, setCurrentTab] = useState<JourneyYear>('1st year');
  const [progressIndex, setProgressIndex] = useState(0);
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);

  const prompts = journeyData[currentTab];

  useEffect(() => {
    const loadProgress = async () => {
      const stored = await AsyncStorage.getItem('journeyProgress');
      if (stored) {
        const { tab, index } = JSON.parse(stored);
        setCurrentTab(tab);
        setProgressIndex(index);
        flatListRef.current?.scrollToIndex({ index, animated: false });
      }
    };
    loadProgress();
  }, []);

  const saveProgress = async (index: number) => {
    await AsyncStorage.setItem(
      'journeyProgress',
      JSON.stringify({ tab: currentTab, index })
    );
  };

  const ITEM_WIDTH = 270 + 20; // 270 width + 20 horizontal margin

  const handleScrollEnd = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / ITEM_WIDTH);
    console.log('Scrolled to index:', index, 'prompts length:', prompts.length);

    if (index === prompts.length) {
      console.log('Navigating to nextstep');
      router.push('/nextstep');
    } else {
      setProgressIndex(index);
      saveProgress(index);
    }
  };

  const renderItem = ({ item }: { item: string }) => {
    if (item === '__end__') {
      return (
        <View style={styles.promptBox}>
          <Text style={styles.promptText}>Loading next step...</Text>
        </View>
      );
    }

    return (
      <View style={styles.promptBox}>
        <Text style={styles.promptText}>{item}</Text>
      </View>
    );
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
            flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
          }}>
            <Text style={[styles.tabText, currentTab === tab && styles.activeTab]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.box}>
        <View style={styles.carouselContainer}>
          {/* Progress Bar Container */}
          <View style={styles.progressBarContainer}>
            <Progress.Bar
              progress={(progressIndex + 1) / prompts.length}
              width={360}
              height={30}
              color="#5C319A"
              borderRadius={20}
              style={styles.verticalProgressBar}
            />
          </View>

          {/* FlatList Container */}
          <View style={styles.flatListContainer}>
            <FlatList
              ref={flatListRef}
              data={[...prompts, '__end__']}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderItem}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={handleScrollEnd}
            />
          </View>
        </View>

        {/* Chat Button */}
        <TouchableOpacity
          style={styles.chatButton}
          onPress={() => router.push('/chat')}
        >
          <Text style={styles.buttonText}>Go to Chat</Text>
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
    marginTop: 70
  },
  progressBar: { 
    marginVertical: 10 
  },
  promptBox: {
    width: 270,
    borderColor: '#9D9D9D',
    borderWidth: 2,
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 10,
    minHeight: 120,
    justifyContent: 'center',
  },
  promptText: { 
    fontSize: 28, 
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
    marginTop: 25,
    backgroundColor: '#F34BC0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignSelf: 'center',
  },
  buttonText: { 
    color: '#F3ECE4',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17
  },
});
