import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet, Text } from 'react-native';
import { useFonts } from 'expo-font'; // Import useFonts
import { getStudySets, createOrUpdateFlashcard } from '../components/FlashcardManagement';

const PetToStudySetCreation = ({ route, navigation }) => {
  const { name } = route.params;
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [title, setTitle] = useState('');
  const [studySets, setStudySets] = React.useState([]);

  useEffect(() => {
    const fetchStudySets = async () => {
      const sets = await getStudySets();
      setStudySets(sets);
    };

    fetchStudySets();
  }, []);

  const [isFontLoaded] = useFonts({
    'Jua-Regular': require('../assets/fonts/Jua-Regular.ttf'), 
  });

  if (!isFontLoaded) {
    return null; 
  }

  const createFlashcard = async () => {
    await createOrUpdateFlashcard(studySets, { studySet: title, question, answer });
    setQuestion('');
    setAnswer('');
    fetchStudySets();
  };

  const completeStudySet = () => {
    navigation.navigate('Flashcards');
  };

  return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>Create a Flashcard for {name}</Text>
            <TextInput
                style={styles.input}
                placeholder="Study Set Title"
                onChangeText={setTitle}
                value={title}
            />
            <TextInput
                style={styles.input}
                placeholder="Question"
                onChangeText={setQuestion}
                value={question}
            />
            <TextInput
                style={styles.input}
                placeholder="Answer"
                onChangeText={setAnswer}
                value={answer}
            />
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={createFlashcard}
                >
                    <Text style={styles.buttonText}>Add Flashcard</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={completeStudySet}
                >
                    <Text style={styles.buttonText}>Complete Study Set</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFBBE0',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 50,
    },
    textStyle: {
        fontSize: 24, 
        fontWeight: 'bold',
        color: '#FF69B4',
        textAlign: 'center',
        fontFamily: 'Jua-Regular',
        marginVertical: 20,
    },
    input: {
        height: 50,
        width: '50%', 
        backgroundColor: 'white',
        borderColor: '#FF69B4',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginVertical: 10, 
        fontFamily: 'Jua-Regular', 
    },
    buttonContainer: {
        backgroundColor: '#FF69B4', 
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25, 
        marginTop: 20, 
        width: '50%', 
        alignItems: 'center', 
    },
    buttonText: {
        color: 'white', 
        fontFamily: 'Jua-Regular', 
        fontSize: 18, 
        fontWeight: 'bold', 
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '50%', // Ensure the row takes full width to space buttons evenly
    },
      
});

export default PetToStudySetCreation;
