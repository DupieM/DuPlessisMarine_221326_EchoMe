import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export const journeyData = {
  '1st year': [
    'When I created my first redesign of a websites for a UX project',
    'Worked on group presentations with wireframes.',
    'Started learning HTML & CSS.',
  ],
  '2nd year': [
    'Built a portfolio website.',
    'Started learning JavaScript and API integration.',
    'Explored usability.',
  ],
  '3rd year': [
    'Explored machine learning for the first time and it was very exciting to learn',
    'Built a mobile app in React Native.',
    'Explored creating an app for accessibility',
  ],
  'Post-Graduete': [
    'Completed first dev project using fully AI functions.',
    'Built real-world applications.',
  ],
};

export const journeyPrompt = (userQuestion: string) => {
  if (!userQuestion) {
    return 'Please enter a valid question about your university journey.';
  }

  return `Use the following university journey to answer the question:\n${JSON.stringify(journeyData, null, 2)}\n\nUser: ${userQuestion}`;
};
