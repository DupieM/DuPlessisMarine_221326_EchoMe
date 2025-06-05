import { ShowcaseData } from '@/components/screen_showcase/ShowcasePrompt';
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, ViewToken, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import { router } from 'expo-router';
// @ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

export default function ShowcaseScreen() {
  // Defines the type for ShowcaseCategory and initializes state variables.
  type ShowcaseCategory = keyof typeof ShowcaseData;
  const categories = Object.keys(ShowcaseData) as ShowcaseCategory[];
  const [currentTab, setCurrentTab] = useState<ShowcaseCategory>(categories[0]);
  const projects = ShowcaseData[currentTab];

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // Handles changes in viewable items for the FlatList, updating the current index.
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index ?? 0);
      }
    }
  ).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  // Handles opening a URL in WebView using expo-router.
  const openLinkInApp = (url: string) => {
    router.push({
      pathname: '/ShowcaseWebViewScreen',
      params: { url: url },
    });
  };

  // Renders the main UI for the Showcase Screen, including categories, a progress bar, and a FlatList of projects.
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.pageTitle}>Showcase</Text>
      <Text style={styles.descriptionText}>
        Take a look at the projects that shaped my style, maybe it’ll spark ideas for your own path.
      </Text>

      <View style={styles.box}>
        <View style={styles.tabContainer}>
          {categories.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => {
                setCurrentTab(tab);
                setCurrentIndex(0);
                flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
              }}
            >
              <Text style={[styles.tabText, currentTab === tab && styles.activeTab]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Progress.Bar
          progress={(currentIndex + 1) / projects.length}
          width={320}
          height={15}
          color="#5C319A"
          borderRadius={8}
          style={{ marginBottom: 10 }}
        />

        <FlatList
          ref={flatListRef}
          data={projects}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewConfigRef.current}
          renderItem={({ item }) => (
            <View style={[styles.projectCard, { width: width - 40 }]}>
              <Image source={item.image} style={styles.projectImage} />
              <Text style={styles.projectName}>{item.name}</Text>
              <Text style={styles.projectDescription}>{item.description}</Text>
              <TouchableOpacity onPress={() => openLinkInApp(item.link)}>
                <Text style={styles.platformLink}>{item.platform} ↗</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <View style={styles.paginationContainer}>
          {projects.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                currentIndex === index && styles.activeDot,
              ]}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

// Defines the stylesheets for the components.
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#A6BCE6',
    alignItems: 'center',
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
    justifyContent: 'center',
    marginBottom: 10,
    flexWrap: 'wrap',
    gap: 12,
  },
  tabText: {
    fontSize: 16,
    color: '#3B3356',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    fontStyle: 'italic'
  },
  activeTab: {
    color: '#1E1924',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  box: {
    width: 360,
    backgroundColor: '#F3ECE4',
    padding: 20,
    marginBottom: -20
  },
  percentText: {
    fontSize: 14,
    color: '#3B3356',
    textAlign: 'center',
    marginBottom: 10,
  },
  projectCard: {
    borderWidth: 1,
    borderColor: '#9D9D9D',
    borderRadius: 12,
    padding: 13,
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
    width: '100%',
    height: 540
  },
  projectImage: {
    width: 280,
    height: 220,
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: 'contain'
  },
  projectName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#3B3356',
    marginBottom: 4,
  },
  projectDescription: {
    fontSize: 20,
    color: '#3B3356',
    textAlign: 'center',
  },
  platformLink: {
    fontSize: 18,
    color: '#5C319A',
    marginTop: 10,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  swipeHint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  swipeHintText: {
    marginLeft: 6,
    color: '#5C319A',
    fontSize: 16,
    fontStyle: 'italic',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },

  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#C4C4C4',
    marginHorizontal: 5,
  },

  activeDot: {
    backgroundColor: '#5C319A',
    width: 12,
    height: 12,
  },
});