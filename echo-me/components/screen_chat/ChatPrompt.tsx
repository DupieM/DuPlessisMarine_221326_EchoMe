import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export const journeyPrompt = (userQuestion: string) => {
  const journeyData = {
    '1st year': [
      'When I created my first redesign of a websites for a UX project',
    ],
    '2nd year': [
      'Built a portfolio website.',
    ],
    '3rd year': [
      'Explored machine learning for teh first tiem and was very exiting to learn',
    ]
  };

  if (!userQuestion) {
    return 'Please enter a valid question about your university journey.';
  }

  return `Use the following university journey to answer the question:\n${JSON.stringify(journeyData, null, 2)}\n\nUser: ${userQuestion}`;
};