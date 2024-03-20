import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

const QuestionSelector = ({ onStart }) => {
  const [numQuestions, setNumQuestions] = useState('');

  const [isFontLoaded] = useFonts({
    "Jua-Regular": require("../assets/fonts/Jua-Regular.ttf"),
  });
  
  if (!isFontLoaded) {
    return null;
  }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.instructionContainer}>
        <Text style={styles.instructionText}>
          Select the number of questions{"\n"}you wish to answer!
        </Text>
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Insert a number!"
          keyboardType="numeric"
          value={numQuestions}
          onChangeText={setNumQuestions}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => onStart(parseInt(numQuestions, 10))}
        >
          <Text style={styles.buttonText}>Start Minigame</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  instructionContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  instructionText: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Jua-Regular',
  },
  container: {
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 20,
    width: '80%',
    backgroundColor: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Jua-Regular',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Jua-Regular',
  },
});

export default QuestionSelector;
