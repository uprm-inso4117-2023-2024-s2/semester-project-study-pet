import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useFonts } from "expo-font";
import { getStudySets, createOrUpdateFlashcard, removeFlashcard } from '../components/FlashcardManagement';
import { useFocusEffect } from '@react-navigation/native';


import StudySet from '../components/StudySet';
import FlashCard from '../components/FlashCard';
import FlashCardCreator from '../components/FlashCardCreator';
import FlashcardRemover from '../components/FlashcardRemover';

/**
 * Flashcards component for displaying flashcards overview.
 * @component
 * @returns {JSX.Element} - Rendered Flashcards component.
 */
export default function Flashcards() {
  const [studySets, setStudySets] = useState([]);
  const [{ isFlashCardCreatorVisible, isFlashCardRemoverVisible }, setVisibility] = useState({
    isFlashCardCreatorVisible: false,
    isFlashCardRemoverVisible: false,
  });
  const [isFontLoaded] = useFonts({
    "Jua-Regular": require("../assets/fonts/Jua-Regular.ttf"),
  });

  useFocusEffect(
    React.useCallback(() => {
      loadStudySets();
      return () => {};
    }, [])
  );

  useEffect(() => {
    loadStudySets();
  }, []);

  const loadStudySets = async () => {
    try {
      const loadedStudySets = await getStudySets();
      setStudySets(loadedStudySets);
    } catch (error) {
      showAlert('Error', error.message);
    }
  };

  const handleCreateFlashcard = async ({ studySet, question, answer }) => {
    try {
      await createOrUpdateFlashcard(studySets, { studySet, question, answer });
      setVisibility({ ...isFlashCardCreatorVisible, isFlashCardCreatorVisible: false });
      loadStudySets();
    } catch (error) {
      showAlert('Error', error.message);
    }
  };

  const handleRemoveFlashcard = async ({ studySet, question }) => {
    try {
      if (!studySetExists(studySet)) {
        showAlert('Error', 'Study Set does not exist.');
        return;
      }
  
      const studySetIndex = studySets.findIndex(set => set.title === studySet);
  
      // If question is empty, remove entire study set
      if (!question.trim()) {
        await removeFlashcard({ studySet, question });
        setVisibility({ ...isFlashCardRemoverVisible, isFlashCardRemoverVisible: false });
        loadStudySets();
        Alert.alert('Removed', 'Study Set removed successfully');
        return;
      }
  
      const existingFlashcardIndex = studySets[studySetIndex].flashcards.findIndex(card => card.question === question);
  
      if (existingFlashcardIndex === -1) {
        showAlert('Error', 'Question does not exist in Study Set.');
        return;
      }
  
      await removeFlashcard({ studySet, question });
      setVisibility({ ...isFlashCardRemoverVisible, isFlashCardRemoverVisible: false });
      loadStudySets();
      Alert.alert('Removed', 'Flashcard removed successfully');
    } catch (error) {
      showAlert('Error', error.message);
    }
  };
  
  const studySetExists = (studySetTitle) => {
    return studySets.some(set => set.title === studySetTitle);
  };
  
  const handleRemoveAll = async () => {
    try {
      // Check if there are existing study sets
      if (studySets.length === 0) {
        showAlert('Error', 'There are no existing study sets to remove.');
        return;
      }
      // Remove all study sets
      await removeFlashcard({ studySet: '', question: '' });
      setVisibility({ ...isFlashCardRemoverVisible, isFlashCardRemoverVisible: false });
      loadStudySets();
      Alert.alert('Removed', 'All flashcards and study sets removed successfully');
    } catch (error) {
      showAlert('Error', error.message);
    }
  };

  const showAlert = (title, message) => {
    Alert.alert(title, message);
  };

  if (!isFontLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.hStack}>
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>Flashcards Overview</Text>
        </View>
      </View>

      <ScrollView style={{ paddingTop: 30 }}>
        {isFlashCardCreatorVisible && (
            <FlashCardCreator 
              onCreate={handleCreateFlashcard}
              onClose={() => setVisibility({ ...isFlashCardCreatorVisible, isFlashCardCreatorVisible: false })} 
            />
        )}

        {isFlashCardRemoverVisible && (
          <FlashcardRemover
            onRemove={handleRemoveFlashcard}
            onRemoveAll={handleRemoveAll}
            onClose={() => setVisibility({ ...isFlashCardRemoverVisible, isFlashCardRemoverVisible: false })}
          />
        )}

        <View style={styles.testy}>
          {studySets.map((studySet, index) => (
            <StudySet key={index} title={studySet.title}>
              <View style={styles.flashcards}>
                {studySet.flashcards.map((flashcard, cardIndex) => (
                  <View key={cardIndex} style={styles.flashcardWrapper}>
                    <FlashCard question={flashcard.question} answer={flashcard.answer} />
                  </View>
                ))}
              </View>
            </StudySet>
          ))}
        </View>
      </ScrollView>

      <View style={{ paddingBottom: 50, }}>
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => setVisibility({ ...isFlashCardCreatorVisible, isFlashCardCreatorVisible: true })}
        >
          <Text style={styles.plusButtonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.minusButton}
          onPress={() => setVisibility({ ...isFlashCardRemoverVisible, isFlashCardRemoverVisible: true })}
        >
          <Text style={styles.minusButtonText}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFBBE0',
    paddingBottom: 60,
    maxHeight:'100vh',
  },
  textStyle: {
    fontSize: 32,
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
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 15,
    marginTop: 20,
    marginVertical: 15, 
    marginHorizontal: 20,
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
  minusButton: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    backgroundColor: 'white',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#000',
    paddingHorizontal: 19,
    paddingVertical: 15,
  },
  minusButtonText: {
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
    marginBottom: 60,
  },
});
