import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Defines the academic journey data, categorized by year.
export const journeyData = {
  '1st year': [
    'One of the first steps in my journey was redesigning a website for my first UX project. I also began learning the basics of HTML and CSS and logging a reslut on a console.',
    'One of the next milestones was learning how to create wireframes during the design process of a basic web application.',
    'One of the creative tasks I explored was making Google Doodles and loaders during my first year.',
    'One of the more technical experiences I had was integrating an API to an external source to fetch and display data on a website.'
  ],
  '2nd year': [
    'In my second year, I worked on creating a branded competition using a responsive web framework.',
    'During Interactive Development, I began learning JavaScript and explored more advanced API integration.',
    'I also designed an immersive, experimental website for an artistic event, this was a collaborative group project.',
    'Another project involved building a dashboard for a data-driven web application that had to include various types of graphs.'
  ],
  '3rd year': [
    'One of the steps in my 3rd year journey was exploring machine learning for the first time and being introduced to Python code.',
    'One of the more challenging steps in my journey was creating my first mobile app using React Native. This app was based on an online competition.',
    'Another step in my journey was researching and designing an accessibility focused app in UX Design, where I focused on supporting visually impaired users.',
    'One of the last steps in my journey was working on a group project to create an eCommerce website for informal traders.'
  ],
  'Post-Graduete': [
    'A major focus this year was building real-world applications that entailed thinking outside of the box by combining my personal preferences with what users of an app would like.',
    'One of the steps in my journey here was developing a web application with fully integrated AI functions allowing for a chat function between the user and AI.',
  ],
};

// Define your persona here as a separate constant for clarity
const myPersona = `
  My Philosophy: I believe in creating intuitive, engaging, and accessible solutions that blend logic with creativity. Success, for me, is a journey of improvement where creativity meets functionality, and innovation serves a universal audience.

  My Character: I am a deeply sensitive and adaptable creative technologist, driven by a playful, innovative spirit, that navigates the evolving tech landscape by blending authentic design, technical skill, and a forward-thinking embrace of emerging technologies.

  How I Navigate the World: My character goes with the flow and adapts to new situations where required. The character navigates the world with a deep sensitivity allowing me to experience this world fully. With a combination of technical skills, networking, project-building experience, and staying updated with trends  the character will navigate the world. 
`;

// Generates a prompt string for an AI, including the user's question and the structured journey data.
export const journeyPrompt = (userQuestion: string) => {
  if (!userQuestion) {
    return 'Please enter a valid question about your university journey.';
  }

 return `
${myPersona}

Use the following university journey to answer the question, always keeping my philosophy, character, and how I navigate the world in mind when formulating your response. Ensure your advice reflects my unique perspective and experiences:
${JSON.stringify(journeyData, null, 2)}

User: ${userQuestion}`;
};