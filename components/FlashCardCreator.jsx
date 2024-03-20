import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useFonts } from "expo-font";

export default function FlashCardCreator({ onCreate }) {
  const [studySet, setStudySet] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [dummy] = useFonts({
    "Jua-Regular": require("../assets/fonts/Jua-Regular.ttf"),
  });

  function handleSubmit() {
    if (!studySet.trim() || (!question.trim() || !answer.trim())) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    const newFlashcard = {
      id: Date.now().toString(),
      studySet,
      question,
      answer,
    };

    onCreate(newFlashcard);

    setStudySet('');
    setQuestion('');
    setAnswer('');

    Alert.alert('Success', 'Flashcard created successfully');
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.legend}>New Flashcard</Text>
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
        <TextInput
          style={[styles.input, styles.textInput]}
          placeholder="Answer"
          placeholderTextColor="gray"
          value={answer}
          onChangeText={setAnswer}
          multiline={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text
            style={{ fontFamily: "Jua-Regular", }}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    borderWidth: 1,
    fontFamily: "Jua-Regular",
    borderWidth: 2,
    borderColor: '#000',
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
  },
});
