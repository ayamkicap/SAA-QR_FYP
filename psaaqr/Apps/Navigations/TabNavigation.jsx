// TabNavigation.jsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import ScanScreen from '../Screens/ScanScreen';
import HistoryScreen from '../Screens/HistoryScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import NotificationScreen from '../Screens/NotificationScreen';
import AlertQRScreen from '../Screens/AlertQRScreen';
import { Ionicons } from '@expo/vector-icons';
import { Text,TouchableOpacity, View } from 'react-native';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStackScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerRight: () => (
            <View style={{ flexDirection: 'row', marginRight: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate('AlertQRScreen')} style={{ marginRight: 10 }}>
              <Ionicons name="qr-code-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={{ marginRight: 10 }}>
              <Ionicons name="notifications" size={24} color="black" />
            </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen name="AlertQRScreen" component={AlertQRScreen} />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
    </Stack.Navigator>  
  );
}

function ScanStackScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Scan"
        component={ScanScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={{ marginRight: 10 }}>
              <Ionicons name="notifications" size={24} color="black" />
            </TouchableOpacity>
          )
        }}
      />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
    </Stack.Navigator>
  );
}

function HistoryStackScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="History"
        component={HistoryScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={{ marginRight: 10 }}>
              <Ionicons name="notifications" size={24} color="black" />
            </TouchableOpacity>
          )
        }}
      />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
    </Stack.Navigator>
  );
}

function ProfileStackScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="History"
        component={ProfileScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={{ marginRight: 10 }}>
              <Ionicons name="notifications" size={24} color="black" />
            </TouchableOpacity>
          )
        }}
      />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
    </Stack.Navigator>
  );
}

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      {/* <Tab.Screen
        name='home'
        component={HomeScreen}
        options={{
          tabBarLabel: ({ color }) => <Text style={{ color: color }}>Home</Text>,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={{ marginRight: 10 }}>
              <Ionicons name="notifications" size={24} color="black" />
            </TouchableOpacity>
          )
        }}
      /> */}
      <Tab.Screen
          name='home'
          component={HomeStackScreen}
          options={{
            tabBarLabel: ({ color }) => <Text style={{ color: color }}>Home</Text>,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            )
          }}
        />
      <Tab.Screen
        name='scan'
        component={ScanStackScreen}
        options={{
          tabBarLabel: ({ color }) => <Text style={{ color: color }}>Scan</Text>,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="scan" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='history'
        component={HistoryStackScreen}
        options={{
          tabBarLabel: ({ color }) => <Text style={{ color: color }}>History</Text>,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="library" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='profile' // Use a different name for clarity
        component={ProfileStackScreen} // Use the top navigation component as the screen component
        options={{
          tabBarLabel: ({ color }) => <Text style={{ color: color }}>Profile</Text>,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
    
  );
}
