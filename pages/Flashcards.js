import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useFonts } from "expo-font";

import Flashcard from '../components/FlashCard';
import FlashCardCreator from '../components/FlashCardCreator';
import StudySet from '../components/StudySet';

/**
 * Flashcards component for displaying flashcards overview.
 * @component
 * @returns {JSX.Element} - Rendered Flashcards component.
 */
export default function Flashcards({ navigation }) {
  const data = Array.from({ length: 8 }, (_, index) => ({ key: String(index) }));

  const [isFlashCardCreatorVisible, setFlashCardCreatorVisible] = useState(false);
  const [isFontLoaded] = useFonts({
    "Jua-Regular": require("../assets/fonts/Jua-Regular.ttf"),
  });

  if (!isFontLoaded) {
    return null; // for now, render nothing
  }

  return (
    <View style={flashcards.container}>
      <View style={flashcards.hStack}>
        <View style={flashcards.textContainer}>
          <Text style={flashcards.textStyle}>Flashcards Overview</Text>
        </View>
      </View>

      <ScrollView>
        <View style={flashcards.testy}>
          <StudySet>
            <View style={flashcards.flashcards}>
              {data.map(item => (
                <View key={item.key} style={flashcards.flashcardWrapper}>
                  <Flashcard />
                </View>
              ))}
            </View>
          </StudySet>
          {isFlashCardCreatorVisible && <FlashCardCreator />}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={flashcards.plusButton}
        onPress={() => setFlashCardCreatorVisible(true)}
      >
        <Text style={flashcards.plusButtonText}>+</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const flashcards = StyleSheet.create({
  buttonContainer: {
    alignItems: 'flex-start',
    justifyContent: 'left',
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFBBE0',
    paddingBottom: 50,
  },
  textStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FF69B4',
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
    borderWidth: 2,
    borderColor: '#000',
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
  },
  
});
