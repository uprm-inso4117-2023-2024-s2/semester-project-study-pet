import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './pages/HomePage';
import Settings from './pages/Settings';
import Mypets from './pages/Mypets';
import Flashcards from './pages/Flashcards';
import Stats from './pages/Stats';

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
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Mypets" component={Mypets} />
          <Stack.Screen name="Flashcards" component={Flashcards} />
          <Stack.Screen name="Stats" component={Stats} />
          {/* Aquí puedes añadir más pantallas como Tab.Screen según sea necesario */}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
