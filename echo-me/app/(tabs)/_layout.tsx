import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import HomeSvg from '../../assets/images/home.svg';
import JourneySvg from '../../assets/images/journey.svg'; 
import ChatSvg from '../../assets/images/chat.svg';      
import HobbiesSvg from '../../assets/images/Mask group.svg'; 
import ShowcaseSvg from '../../assets/images/projects.svg'; 


export default function TabLayout() {
  const colorScheme = useColorScheme();

  // Define your colors
  const activeIconColor = '#FFFFFF'; // White for active SVG
  const inactiveIconColor = '#C5D5ED'; // Light blue/grey for inactive SVG
  const tabBarBackgroundColor = '#5C319A'; // Deep purple for tab bar background

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: tabBarBackgroundColor, 
          },
          default: {
            backgroundColor: tabBarBackgroundColor, 
          },
        }),

        tabBarLabelStyle: {
          color: inactiveIconColor,
        },
        tabBarActiveTintColor: activeIconColor,
        tabBarInactiveTintColor: inactiveIconColor,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="journey"
        options={{
          title: 'Journey',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="hobbies"
        options={{
          title: 'Hobbies',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="showcase"
        options={{
          title: 'Showcase',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}