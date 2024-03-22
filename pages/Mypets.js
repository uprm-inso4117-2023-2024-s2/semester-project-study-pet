import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, Modal, Platform, DatePickerAndroid } from "react-native";

import { sendNotificationImmediately } from "./notifications";

import { petEventEmitter } from "./EventEmitter";


const CreatePetScreen = ({ navigation }) => {
  const [petName, setPetName] = useState("");
  const [examDate, setExamDate] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [diffModalVisible, setdiffModalVisible] = useState(false);
  const [typeModalVisible, settypeModalVisible] = useState(false);
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
      sleepTime: '22:30',  // Dummy value for now (10:30 pm), must be a valid time
    };

    // Trigger event for the Pet.jsx to receive the type
    petEventEmitter.emit("petType", type);

    console.log("New Pet:", newPet);
    sendNotificationImmediately();
    navigation.goBack();
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
      <TouchableOpacity onPress={() => setdiffModalVisible(true)}>
        <Text>Select Difficulty: {difficulty}</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={diffModalVisible}
        onRequestClose={() => setdiffModalVisible(false)}
      >
        <View style={{ marginTop: 100, marginLeft: 20, marginRight: 20, backgroundColor: 'white', padding: 20 }}>
          {difficultyOptions.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => {
                setDifficulty(option);
                setdiffModalVisible(false);
              }}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      <TouchableOpacity onPress={() => settypeModalVisible(true)}>
        <Text>Select Pet Type: {type}</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={typeModalVisible}
        onRequestClose={() => settypeModalVisible(false)}
      >
        <View style={{ marginTop: 100, marginLeft: 20, marginRight: 20, backgroundColor: 'white', padding: 20 }}>
          {typeOptions.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => {
                setType(option);
                settypeModalVisible(false);
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
