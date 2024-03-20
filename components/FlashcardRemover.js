import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useFonts } from "expo-font";

export default function FlashcardRemover({ onRemove, onRemoveAll }) {
  const [studySet, setStudySet] = useState('');
  const [question, setQuestion] = useState('');
  const [dummy] = useFonts({
    "Jua-Regular": require("../assets/fonts/Jua-Regular.ttf"),
  });

  const handleEmptyFieldsError = () => {
    Alert.alert('Error', 'Please fill out at least one field to remove a flashcard or leave question blank to remove an entire set.');
  };

  const handleStudySetEmptyError = () => {
    Alert.alert('Error', 'Study Set cannot be empty.');
  };

  const handleRemoveAllError = () => {
    Alert.alert('Error', 'In order to remove all flashcards and study sets, please leave both fields empty.');
  };

  const handleConfirmRemoveAll = () => {
    Alert.alert(
      'Remove All',
      'Are you sure you want to remove all flashcards and study sets?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'Remove All',
          onPress: () => {
            onRemoveAll();
            setStudySet('');
            setQuestion('');
          }
        }
      ],
      { cancelable: true }
    );
  };

  const handleRemoveAll = () => {
    if (studySet.trim() || question.trim()) {
      handleRemoveAllError();
    } else if (studySet.trim() === '' && question.trim() === '' && onRemoveAll) {
      handleConfirmRemoveAll();
    } else {
      Alert.alert('Error', 'No study sets available to remove.');
    }
  };

  const handleSubmit = () => {
    if (!studySet.trim() && !question.trim()) {
      handleEmptyFieldsError();
    } else if (!studySet.trim()) {
      handleStudySetEmptyError();
    } else {
      const removedFlashcard = {
        studySet,
        question,
      };
  
      onRemove(removedFlashcard);
  
      setStudySet('');
      setQuestion('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.legend}>Remove Flashcard or Study Set</Text>
        <TextInput
          style={[styles.input, styles.textInput]}
          placeholder="Study Set"
          placeholderTextColor="gray"
          value={studySet}
          onChangeText={setStudySet}
        />
        <TextInput
          style={[styles.input, styles.textInput]}
          placeholder="Question"
          placeholderTextColor="gray"
          value={question}
          onChangeText={setQuestion}
          multiline={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={{ fontFamily: "Jua-Regular", }}>Remove</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.removeAllButton} onPress={handleRemoveAll}>
          <Text style={{ fontFamily: "Jua-Regular", }}>Remove All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFBBE0',
  },
  formContainer: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 30,
    width: 300,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    marginBottom: 15,
  },
  legend: {
    textAlign: 'center',
    fontSize: 22,
    borderRadius: 20,
    marginBottom: 10,
    paddingBottom: 15,
    fontFamily: "Jua-Regular",
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderRadius: 5,
    padding: 3,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 2,
    fontFamily: "Jua-Regular",
  },
  button: {
    display: 'inline-block',
    alignSelf: 'center',
    backgroundColor: '#ffbbe0',
    paddingVertical: 10,
    paddingHorizontal: 50,
    fontSize: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    marginBottom: 15,
  },
  removeAllButton: {
    alignSelf: 'center',
    backgroundColor: '#f08080',
    paddingVertical: 10,
    paddingHorizontal: 50,
    fontSize: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
  }
});
