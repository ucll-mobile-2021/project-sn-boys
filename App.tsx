import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LandingScreen } from './src/screens/LoginScreen';
import { AfspraakScreen } from './src/screens/AfspraakScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UpdateScreen } from './src/screens/UpdateScreen'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name="Login"
        component={LandingScreen}
        />
        <Stack.Screen
          name="Afspraken"
          component={AfspraakScreen}
          />
        <Stack.Screen
          name="updateAfspraak"
          component={UpdateScreen}
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
