// TabNavigation.jsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabNavigationTop from './TabNAvigationTop'; // Import the top navigation component
import HomeScreen from '../Screens/HomeScreen';
import ScanScreen from '../Screens/ScanScreen';
import HistoryScreen from '../Screens/HistoryScreen';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='top' // Use a different name for clarity
        component={TabNavigationTop} // Use the top navigation component as the screen component
        options={{
          tabBarLabel: ({ color }) => <Text style={{ color: color }}>Top</Text>,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="arrow-up" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='home'
        component={HomeScreen}
        options={{
          tabBarLabel: ({ color }) => <Text style={{ color: color }}>Home</Text>,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='scan'
        component={ScanScreen}
        options={{
          tabBarLabel: ({ color }) => <Text style={{ color: color }}>Scan</Text>,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="scan" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='history'
        component={HistoryScreen}
        options={{
          tabBarLabel: ({ color }) => <Text style={{ color: color }}>History</Text>,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="library" size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
}
