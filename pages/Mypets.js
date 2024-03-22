import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Pet from '../components/Pet';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function MyPetScreen() {
  const navigation = useNavigation();
  const [numberOfPets, setNumberOfPets] = useState(1);
  const pets = ['Current Pet', 'Create New Pet 1', 'Create New Pet 2'];
  const [currentPetIndex, setCurrentPetIndex] = useState(0);

  const scrollViewRef = useRef(null);

  const handleSwipe = (event) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    const currentIndex = Math.round(contentOffset.x / layoutMeasurement.width);
    setCurrentPetIndex(currentIndex);
  };

  const goToNextPet = () => {
    if (currentPetIndex < pets.length - 1) {
      setCurrentPetIndex(currentPetIndex + 1);
    } else {
      setCurrentPetIndex(0);
      scrollViewRef.current.scrollTo({ x: 0, animated: false });
    }
  };

  const goToPreviousPet = () => {
    if (currentPetIndex > 0) {
      setCurrentPetIndex(currentPetIndex - 1);
    } else {
      setCurrentPetIndex(pets.length - 1);
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  };

  const handleCreateNewPet = () => {
    navigation.navigate('CreatePetPage');
  };

  return (
    <LinearGradient colors={['#add8e6', '#87cefa']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goToPreviousPet}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{pets[currentPetIndex]}</Text>
        <TouchableOpacity onPress={goToNextPet}>
          <Ionicons name="chevron-forward" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleSwipe}
        contentContainerStyle={styles.scrollContainer}
        ref={scrollViewRef}
      >
        {pets.map((pet, index) => (
          <View key={index} style={styles.petContainer}>
            {index === currentPetIndex ? (
              <Pet style={styles.petItem} />
            ) : (
              <TouchableOpacity onPress={handleCreateNewPet}>
                <View style={styles.petItemContainer}>
                  <Text style={styles.petName}>{`Create New Pet ${index + 1}`}</Text>
                  <Ionicons name="add" size={24} color="white" />
                </View>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
      <View style={styles.createPetContainer}>
        <Text style={styles.petCountText}>You currently have {numberOfPets} pet(s)</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerText: {
    fontSize: 20,
    color: 'white',
  },
  scrollContainer: {
    alignItems: 'center',
  },
  petContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  petItemContainer: {
    alignItems: 'center',
    width: '100%', // Ensure the width covers the whole screen
  },
  petName: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  createPetContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  petCountText: {
    fontSize: 16,
    marginBottom: 10,
    color: 'white',
  },
});

export default MyPetScreen;
