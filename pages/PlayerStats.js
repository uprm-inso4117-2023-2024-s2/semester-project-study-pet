import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Pet from '../components/Pet';

function PlayerStats() {
  const navigation = useNavigation();

  const [flashcardCount, setFlashcardCount] = useState(0); // Initialize flashcard counter
  const [poopCount, setPoopCount] = useState(0); // Initialize poop counter
  const [petCount, setPetCount] = useState(0); // Initialize pet counter

  const goBack = () => {
    navigation.goBack();
  };

  const handleFlashcardAnswer = () => {
    // Increment flashcard counter when user answers a flashcard question
    setFlashcardCount(prevCount => prevCount + 1);
  };

  const handlePoopPickup = () => {
    // Increment poop counter when user picks up poop
    setPoopCount(prevCount => prevCount + 1);
  };

  const handlePetAdoption = () => {
    // Increment pet counter when user adopts a pet, up to a maximum of 3 pets
    if (petCount < 3) {
      setPetCount(prevCount => prevCount + 1);
    }
  };

  const pet = new Pet(); 

  return (
    <LinearGradient colors={['#fcf188', '#fffbcf']} style={styles.container}>
      {/* Player Icon */}
      <View style={styles.pawContainer}>
        <View style={[styles.pawBorder, { backgroundColor: '#3498db' }]}>
          <Ionicons name="person" size={110} color="white" />
        </View>
        <View style={styles.circle}></View>
      </View>

      {/* PlayerStats Section */}
      <View style={styles.statsContainer}>
        <ScrollView contentContainerStyle={styles.statsContent}>
          <View style={styles.statsBox}>
            <Text style={[styles.statsLabel, { color: '#3498db' }]}>Player Name:</Text>
            <Text style={[styles.statsValue, { color: '#3498db' }]}>{pet.state.name}</Text>
          </View>
          
          <View style={styles.statsBox}>
            <Text style={[styles.statsLabel, { color: '#3498db' }]}>Flashcard Questions Answered: </Text>
            <Text style={[styles.statsValue, { color: '#3498db' }]}>{flashcardCount}</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={[styles.statsLabel, { color: '#3498db' }]}>Poops Picked Up:</Text>
            <Text style={[styles.statsValue, { color: '#3498db' }]}>{poopCount}</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={[styles.statsLabel, { color: '#3498db' }]}>Pets Owned:</Text>
            <Text style={[styles.statsValue, { color: '#3498db' }]}>{petCount}/3</Text>
          </View>
        </ScrollView>
      </View>

      {/* Example buttons to simulate interactions */}
      <TouchableOpacity onPress={handleFlashcardAnswer} style={styles.actionButton}>
        <Text style={styles.actionButtonText}>Answer Flashcard</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePoopPickup} style={styles.actionButton}>
        <Text style={styles.actionButtonText}>Pick Up Poop</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePetAdoption} style={styles.actionButton}>
        <Text style={styles.actionButtonText}>Adopt a Pet</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff9c4',
    padding: 20,
    justifyContent: 'center', // Align children components vertically at the center
  },

  statsContainer: {
    alignItems: 'center', // Align children components horizontally at the center
  },

  statsContent: {
    alignItems: 'center', // Align children components horizontally at the center
  },

  // Adjust the styles for the pawBorder to make it rounded
pawBorder: {
  width: 150,
  height: 150,
  borderRadius: 75, // Half of width and height to make it circular
  borderWidth: 5, // Adjust border width as needed
  borderColor: 'white', // Color of the border
  justifyContent: 'center',
  alignItems: 'center',
},

statsBox: {
  flexDirection: 'row', // Make the contents of the box align horizontally
  justifyContent: 'space-between', // Ensure the text and value are spaced evenly
  marginBottom: 10,
  backgroundColor: 'white',
  borderWidth: 2,
  borderColor: '#3498db',
  padding: 10,
  borderRadius: 10,
  width: '80%',
  shadowColor: '#000',
  alignItems: 'center', // Align text components vertically at the center
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 1.80,
  elevation: 3,
},

statsLabel: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#3498db',
},

statsValue: {
  fontSize: 18,
  color: '#3498db',
},

  pawContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },

  actionButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default PlayerStats;
