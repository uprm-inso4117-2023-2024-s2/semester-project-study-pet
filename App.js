import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useState } from "react";

import HomePage from "./pages/HomePage";
import Settings from "./pages/Settings";
import Mypets from "./pages/Mypets";
import Flashcards from "./pages/Flashcards";
import Stats from "./pages/Stats";
import Game from "./pages/Game";
import Eat from "./pages/Eat";
import Bath from "./pages/Bath";
import Shop from "./pages/Shop";
import PetToStudySetCreation from './pages/PetToStudySetCreation';
import CreatePetScreen from './pages/CreatePetScreen';
import PlayerStats from './pages/PlayerStats';

const Stack = createStackNavigator();

export default function App() {
  const [studyPoints, setStudyPoints] = useState(500);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Flashcards" component={Flashcards} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Mypets" component={Mypets} />
        <Stack.Screen name="Stats" component={Stats} />
        <Stack.Screen name="PlayerStats" component={PlayerStats} />
        <Stack.Screen name="Game" component={Game} />
        <Stack.Screen name="Eat" component={Eat} />
        <Stack.Screen name="Bath" component={Bath} />
        <Stack.Screen
          name="Shop"
          children={() => (
            <Shop studyPoints={studyPoints} setStudyPoints={setStudyPoints} />
          )}
        />
        <Stack.Screen name="Create study set" component={PetToStudySetCreation} />
        <Stack.Screen name="CreatePetScreen" component={CreatePetScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
