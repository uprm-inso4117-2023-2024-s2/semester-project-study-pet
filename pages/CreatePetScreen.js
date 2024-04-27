import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, Modal } from "react-native";
import { petEventEmitter } from "./EventEmitter";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreatePetScreen = ({ navigation }) => {
  const [petName, setPetName] = useState("");
  const [examDate, setExamDate] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [diffModalVisible, setDiffModalVisible] = useState(false);
  const [typeModalVisible, setTypeModalVisible] = useState(false);
  const [dateError, setDateError] = useState("");
  const [type, setType] = useState("frog");

  const difficultyOptions = ["easy", "medium", "hard"];
  const typeOptions = ["frog", "dog", "cat", "bunny", "penguin", "pig", "bear"];

  const validateDate = (dateString) => {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return regex.test(dateString);
  };

  const createNewPet = () => {
    if (!validateDate(examDate)) {
      setDateError("Invalid date format. Please enter in dd/mm/yyyy format.");
      return;
    }

    const newPet = {
      name: petName,
      examDate: examDate,
      difficulty: difficulty,
      happiness: 100,
      hunger: 100,
      type: type,
    };

    // Trigger event for the Pet.jsx to receive the type
    petEventEmitter.emit("petType", type);

    console.log("New Pet:", newPet);

    navigation.navigate('Create study set', { petType: newPet.name, difficulty: newPet.difficulty });
  
    AsyncStorage.setItem('selectedDifficulty', difficulty); // Save selected difficulty
  
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Create a New Pet</Text>
      <TextInput
        placeholder="Pet Name"
        value={petName}
        onChangeText={(text) => setPetName(text)}
      />
      <TextInput
        placeholder="Exam Date (dd/mm/yyyy)"
        value={examDate}
        onChangeText={(text) => {
          setExamDate(text);
          setDateError("");
        }}
      />
      {dateError ? <Text style={{ color: 'red' }}>{dateError}</Text> : null}
      <TouchableOpacity onPress={() => setDiffModalVisible(true)}>
        <Text>Select Difficulty: {difficulty}</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={diffModalVisible}
        onRequestClose={() => setDiffModalVisible(false)}
      >
        <View style={{ marginTop: 100, marginLeft: 20, marginRight: 20, backgroundColor: 'white', padding: 20 }}>
          {difficultyOptions.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => {
                setDifficulty(option);
                setDiffModalVisible(false);
              }}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      <TouchableOpacity onPress={() => setTypeModalVisible(true)}>
        <Text>Select Pet Type: {type}</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={typeModalVisible}
        onRequestClose={() => setTypeModalVisible(false)}
      >
        <View style={{ marginTop: 100, marginLeft: 20, marginRight: 20, backgroundColor: 'white', padding: 20 }}>
          {typeOptions.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => {
                setType(option);
                setTypeModalVisible(false);
              }}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      <Button title="Create Pet" onPress={createNewPet} />
    </View>
  );
};

export default CreatePetScreen;
