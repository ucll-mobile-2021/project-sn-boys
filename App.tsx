import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LandingScreen } from './src/screens/LoginScreen';
import { EventScreen } from './src/screens/EventScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TestScreen } from './src/screens/TestScreen'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name="Login Page"
        component={LandingScreen}
        />
        <Stack.Screen
          name="Evenementen"
          component={EventScreen}
          />
        <Stack.Screen
          name="Evenement"
          component={TestScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
