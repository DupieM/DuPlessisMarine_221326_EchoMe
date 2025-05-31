import { ShowcaseData } from '@/components/screen_showcase/ShowcasePrompt';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as Progress from 'react-native-progress';



export default function ShowcaseScreen() {
 type ShowcaseCategory = keyof typeof ShowcaseData;
const categories = Object.keys(ShowcaseData) as ShowcaseCategory[];
const [currentTab, setCurrentTab] = useState<ShowcaseCategory>(categories[0]);

const projects = ShowcaseData[currentTab];
  const [progressIndex, setProgressIndex] = useState(0);

  const handleNext = () => {
    if (progressIndex < projects.length - 1) {
      setProgressIndex(progressIndex + 1);
    }
  };

  const handlePrev = () => {
    if (progressIndex > 0) {
      setProgressIndex(progressIndex - 1);
    }
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
              setProgressIndex(0);
            }}
          >
            <Text style={[styles.tabText, currentTab === tab && styles.activeTab]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Progress.Bar
        progress={(progressIndex + 1) / projects.length}
        width={300}
        height={10}
        color="#ba1fa4"
        borderRadius={5}
        style={{ marginBottom: 10 }}
      />
      <Text style={styles.percentText}>
        {Math.round(((progressIndex + 1) / projects.length) * 100)}%
      </Text>

      <View style={styles.projectCard}>
        <Image source={{ uri: projects[progressIndex].image }} style={styles.projectImage} />
        <Text style={styles.projectName}>{projects[progressIndex].name}</Text>
        <Text style={styles.projectDescription}>{projects[progressIndex].description}</Text>
      </View>

      <View style={styles.navigationButtons}>
        <TouchableOpacity onPress={handlePrev} disabled={progressIndex === 0} style={[styles.navButton, progressIndex === 0 && styles.disabled]}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNext} disabled={progressIndex === projects.length - 1} style={[styles.navButton, progressIndex === projects.length - 1 && styles.disabled]}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  descriptionText: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
    gap: 12,
  },
  tabText: {
    fontSize: 16,
    color: '#999',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  activeTab: {
    color: '#ba1fa4',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  percentText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  projectCard: {
    borderWidth: 1,
    borderColor: '#ba1fa4',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#fdfdfd',
    width: '100%',
  },
  projectImage: {
    width: 200,
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  projectDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  navigationButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  navButton: {
    backgroundColor: '#ba1fa4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  disabled: {
    opacity: 0.5,
  },
});
