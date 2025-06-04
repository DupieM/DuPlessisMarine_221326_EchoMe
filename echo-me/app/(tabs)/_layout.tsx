import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import HomeActive from '../../assets/images/Navbar/Home_Active.png';
import HomeInactive from '../../assets/images/Navbar/Home_Inactive.png';
import JourneyActive from '../../assets/images/Navbar/Journey_Active.png';
import JourneyInactive from '../../assets/images/Navbar/Journey_Inactive.png';
import ChatActive from '../../assets/images/Navbar/Chat_Active.png';
import ChatInactive from '../../assets/images/Navbar/Chat_Inactive.png';
import HobbiesActive from '../../assets/images/Navbar/Hobbies_Active.png';
import HobbiesInactive from '../../assets/images/Navbar/Showcase_Inactive.png';
import ShowcaseActive from '../../assets/images/Navbar/Showcase_Active.png';
import ShowcaseInactive from '../../assets/images/Navbar/Showcase_Inactive.png';


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
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? HomeActive : HomeInactive}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="journey"
        options={{
          title: 'Journey',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? JourneyActive : JourneyInactive}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? ChatActive : ChatInactive}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="hobbies"
        options={{
          title: 'Hobbies',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? HobbiesActive : HobbiesInactive}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="showcase"
        options={{
          title: 'Showcase',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? ShowcaseActive : ShowcaseInactive}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tabs>
  );
}