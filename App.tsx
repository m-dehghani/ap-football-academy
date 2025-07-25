import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

// Screens
import HomeScreen from './screens/HomeScreen';
import ProgramsScreen from './screens/ProgramsScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Register: undefined;
};

export type TabParamList = {
  Home: undefined;
  Programs: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Programs') {
            iconName = focused ? 'football' : 'football-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'home-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#dc2626',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#dc2626',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'خانه' }}
      />
      <Tab.Screen 
        name="Programs" 
        component={ProgramsScreen} 
        options={{ title: 'برنامه‌ها' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ title: 'پروفایل' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#dc2626" />
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#dc2626',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Main" 
          component={MainTabs} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'ورود' }}
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ title: 'ثبت نام' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
