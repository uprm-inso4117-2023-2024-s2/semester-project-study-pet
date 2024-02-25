import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from "expo-font";

import HomePage from './pages/HomePage';
import Settings from './pages/Settings';
import Mypets from './pages/Mypets';
import Flashcards from './pages/Flashcards'; // Maybe hay que eliminarlo?
import Stats from './pages/Stats';
import Game from './pages/Game';
import Eat from './pages/Eat';
import Bath from './pages/Bath';

import StudySet from './components/StudySet';
import Flashcard from './components/FlashCard';
import FlashCardCreator from './components/FlashCardCreator';

function HomeScreen({ navigation }){
  return (
    <View style={homePage.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Overview Screen"
        onPress={() => navigation.navigate('Overview')}
      />
      <StatusBar style="auto" />
    </View>
  );
}

function OverviewScreen({ navigation }) {
  const data = Array.from({ length: 8 }, (_, index) => ({ key: String(index) }));
  const [isFlashCardCreatorVisible, setFlashCardCreatorVisible] = useState(false);
  const [isFontLoaded] = useFonts({
    "Jua-Regular": require("./assets/fonts/Jua-Regular.ttf"),
  });

  if (!isFontLoaded) {
    return null; // or render a loading indicator
  }

  return (
    <View style={overviewPage.container}>
      <View style={overviewPage.hStack}>
        <View style={overviewPage.textContainer}>
          <Text style={overviewPage.textStyle}>Flashcards Overview</Text>
        </View>
      </View>

      <ScrollView>
        <View style={overviewPage.testy}>
          <StudySet>
            <View style={overviewPage.flashcards}>
              {data.map(item => (
                <View key={item.key} style={overviewPage.flashcardWrapper}>
                  <Flashcard />
                </View>
              ))}
            </View>
          </StudySet>
          {isFlashCardCreatorVisible && <FlashCardCreator />}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={overviewPage.plusButton}
        onPress={() => setFlashCardCreatorVisible(true)}
      >
        <Text style={overviewPage.plusButtonText}>+</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  const [isFontLoaded] = useFonts({
    "Jua-Regular": require("./assets/fonts/Jua-Regular.ttf"),
  });

  if (!isFontLoaded) {
    return null; // or render a loading indicator
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Overview" component={OverviewScreen} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Mypets" component={Mypets} />
        <Stack.Screen name="Stats" component={Stats} />
        <Stack.Screen name="Game" component={Game} />
        <Stack.Screen name="Eat" component={Eat} />
        <Stack.Screen name="Bath" component={Bath} />
        {/* Asegúrate de revisar y ajustar los nombres de los componentes y las rutas según sea necesario */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const overviewPage = StyleSheet.create({
  buttonContainer: {
    alignItems: 'flex-start',
    justifyContent: 'left',
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFBBE0',
  },
  textStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Jua-Regular',
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
  },
  hStack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  plusButton: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 15,
  },
  plusButtonText: {
    fontSize: 40,
    color: '#E14D9D',
  },
  flashcards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  flashcardWrapper: {
    width: '50%',
  },
  testy: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

const homePage = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFBBE0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
