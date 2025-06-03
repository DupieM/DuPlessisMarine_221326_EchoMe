// app/showcase.tsx
import { ShowcaseData } from '@/components/screen_showcase/ShowcasePrompt';
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, ViewToken, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import { router } from 'expo-router'; // Import the router

const { width } = Dimensions.get('window');

export default function ShowcaseScreen() {
  type ShowcaseCategory = keyof typeof ShowcaseData;
  const categories = Object.keys(ShowcaseData) as ShowcaseCategory[];
  const [currentTab, setCurrentTab] = useState<ShowcaseCategory>(categories[0]);
  const projects = ShowcaseData[currentTab];

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index ?? 0);
      }
    }
  ).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  // Function to handle opening the URL in WebView using expo-router
  const openLinkInApp = (url: string) => {
    // Navigate to ShowcaseWebViewScreen and pass the URL as a query parameter
    router.push({
      pathname: '/ShowcaseWebViewScreen', // This matches your file name app/ShowcaseWebViewScreen.tsx
      params: { url: url },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.pageTitle}>Showcase</Text>
      <Text style={styles.descriptionText}>
        Explore my unique style through the various projects I have done.
      </Text>

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

      <View style={styles.box}>
        <Progress.Bar
          progress={(currentIndex + 1) / projects.length}
          width={320}
          height={15}
          color="#5C319A"
          borderRadius={8}
          style={{ marginBottom: 10 }}
        />
        {/* <Text style={styles.percentText}>
          {Math.round(((currentIndex + 1) / projects.length) * 100)}%
        </Text> */}

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
              {/* Call the new openLinkInApp function */}
              <TouchableOpacity onPress={() => openLinkInApp(item.link)}>
                <Text style={styles.platformLink}>{item.platform} ↗</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
}

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
    height: 500
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
  }
});