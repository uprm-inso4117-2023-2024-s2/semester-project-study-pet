import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomePage from './pages/HomePage';
import Settings from './pages/Settings';
import Mypets from './pages/Mypets';
import Flashcards from './pages/Flashcards';
import Stats from './pages/Stats';
import Game from './pages/Game';
import Eat from './pages/Eat';
import Bath from './pages/Bath';
import CreatePetScreen from './pages/CreatePetScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Flashcards" component={Flashcards} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Mypets" component={Mypets} />
        <Stack.Screen name="Stats" component={Stats} />
        <Stack.Screen name="Game" component={Game} />
        <Stack.Screen name="Eat" component={Eat} />
        <Stack.Screen name="Bath" component={Bath} />
        <Stack.Screen name="CreatePetScreen" component={CreatePetScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
