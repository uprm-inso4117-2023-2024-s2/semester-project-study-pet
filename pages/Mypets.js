

import { View, Text, TextInput, Button, TouchableOpacity, Modal, Platform, DatePickerAndroid } from "react-native";

import { sendNotificationImmediately } from "./notifications";

import { petEventEmitter } from "./EventEmitter";

import React, { useState, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Pet from '../components/Pet';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const CreatePetScreen = ({ navigation }) => {
  const [petName, setPetName] = useState("");
  const [examDate, setExamDate] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [diffModalVisible, setdiffModalVisible] = useState(false);
  const [typeModalVisible, settypeModalVisible] = useState(false);
  const [dateError, setDateError] = useState("");
  const [type, setType] = useState("frog");



function Mypets() {
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
    const newPet = {
      name: petName,
      examDate: examDate,
      difficulty: difficulty,
      happiness: 100,
      hunger: 100,
      type: type,
      sleepTime: '22:30',  // Dummy value for now (10:30 pm), must be a valid time
    };

    // Trigger event for the Pet.jsx to receive the type
    petEventEmitter.emit("petType", type);

    console.log("New Pet:", newPet);
    sendNotificationImmediately();
    navigation.goBack();

  const goToPreviousPet = () => {
    if (currentPetIndex > 0) {
      setCurrentPetIndex(currentPetIndex - 1);
    } else {
      setCurrentPetIndex(pets.length - 1);
      scrollViewRef.current.scrollToEnd({ animated: false });
    }

  };

  const handleCreateNewPet = () => {
    navigation.navigate('CreatePetScreen');
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
}
export default Mypets;
