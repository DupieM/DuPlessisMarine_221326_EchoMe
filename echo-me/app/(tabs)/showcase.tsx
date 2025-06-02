import { ShowcaseData } from '@/components/screen_showcase/ShowcasePrompt';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as Progress from 'react-native-progress';
import { Linking } from 'react-native';


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


      <View style={styles.box}>
        <Progress.Bar
          progress={(progressIndex + 1) / projects.length}
          width={320}
          height={15}
          color="#5C319A"
          borderRadius={8}
          style={{ marginBottom: 10 }}
        />
        <Text style={styles.percentText}>
          {Math.round(((progressIndex + 1) / projects.length) * 100)}%
        </Text>

        <View style={styles.projectCard}>
          <Image source={projects[progressIndex].image} style={styles.projectImage} />
          <Text style={styles.projectName}>{projects[progressIndex].name}</Text>
          <Text style={styles.projectDescription}>{projects[progressIndex].description}</Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(projects[progressIndex].link);
            }}
          >
            <Text style={styles.platformLink}>
              {projects[progressIndex].platform} ↗
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.navigationButtons}>
          <TouchableOpacity onPress={handlePrev} disabled={progressIndex === 0} style={[styles.navButton, progressIndex === 0 && styles.disabled]}>
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNext} disabled={progressIndex === projects.length - 1} style={[styles.navButton, progressIndex === projects.length - 1 && styles.disabled]}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
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
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  projectImage: {
    width: 280,
    height: 220,
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: 'contain'
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3B3356',
    marginBottom: 4,
  },
  projectDescription: {
    fontSize: 14,
    color: '#3B3356',
    textAlign: 'center',
  },
  platformLink: {
  color: '#5C319A',
  marginTop: 10,
  fontWeight: 'bold',
  textDecorationLine: 'underline',
},
  navigationButtons: {
    width: 110,
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 15,
    marginLeft: 55
  },
  navButton: {
    backgroundColor: '#F34BC0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#F3ECE4',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17
  },
  disabled: {
    opacity: 0.3,
  },
});
