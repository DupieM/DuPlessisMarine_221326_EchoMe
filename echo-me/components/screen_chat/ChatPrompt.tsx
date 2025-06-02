import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export const journeyData = {
  '1st year': [
    'My first UX project was the redesign of a website. I also started learning the basics of HTML & CSS.',
    'The next step was to design wireframes for a very basic application. ',
    'Creating Google doodles and loaders also formed part of my journey in my first year',
    'Integrating to an API to fetch data and display it on a website'
  ],
  '2nd year': [
    'In my second year I had to create a branded Competition in a responsive web framework',
    'In Interactive Development I started learning JavaScript and more complex API integration',
    'I had to design an immersive, experimental website for an artistic event, this was a group project',
    'One of my projects were to create a dashboard for a data-driven web application'
  ],
  '3rd year': [
    'I explored machine learning for the first time and I was exposed to python code',
    'I created my first mobile app in React Native',
    'In UX Design we explored creating an app for accessibility users, my focus was on visually impaired users',
    'We did a group project where we had to create an ecommerce website for informal traders'
  ],
  'Post-Graduete': [
    'The main aim of this year is to built real-world applications',
    'My first development project was to fully integrate AI functions into a web application', 
  ],
};

export const journeyPrompt = (userQuestion: string) => {
  if (!userQuestion) {
    return 'Please enter a valid question about your university journey.';
  }

  return `Use the following university journey to answer the question:\n${JSON.stringify(journeyData, null, 2)}\n\nUser: ${userQuestion}`;
};
