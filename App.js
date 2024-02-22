import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './HomePage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Inicio" 
          component={HomePage}
          options = {{ headerShown: false }}
          />
          {/* Aquí puedes añadir más pantallas como Tab.Screen según sea necesario */}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
