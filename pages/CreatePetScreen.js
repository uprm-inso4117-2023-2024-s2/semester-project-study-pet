import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, Modal, Image } from "react-native";
import frogImage from '../components/PetImages/FrogImages/animatedFrog.gif';
import dogImage from '../components/PetImages/DogImages/animatedDog.png';
import catImage from '../components/PetImages/CatImages/animatedCat.png';
import bunnyImage from '../components/PetImages/BunnyImages/animatedBunny.png';
import penguinImage from '../components/PetImages/PenguinImages/animatedPenguin.png';
import pigImage from '../components/PetImages/PigImages/animatedPig.png';
import bearImage from '../components/PetImages/BearImages/animatedBear.png';


const petImages = {
  frog: frogImage,
  dog: dogImage,
  cat: catImage,
  bunny: bunnyImage,
  penguin: penguinImage,
  pig: pigImage,
  bear: bearImage,
};

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

  // Define background colors for each pet type
  const petBackgrounds = {
    frog: "#7DCEA0",
    dog: "#D7BDE2",
    cat: "#F7DC6F",
    bunny: "#A9CCE3",
    penguin: "#F1948A",
    pig: "#F5B7B1",
    bear: "#E59866"
  };

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

    console.log("New Pet:", newPet);
    navigation.navigate('Create study set', { petType: newPet.name });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: petBackgrounds[type] }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "blue" }}>Create a New Pet</Text>
      <Image
    source={petImages[type]}
    style={{ width: 100, height: 100, marginBottom: 10 }}
  />
      <TextInput
        style={{ width: 300, height: 40, borderWidth: 2, borderColor: '#3498db', marginBottom: 10, paddingHorizontal: 10, backgroundColor: "#fff9c4", color: "#3498db" }}
        placeholder="Pet Name"
        value={petName}
        onChangeText={(text) => setPetName(text)}
      />
      <TextInput
        style={{ width: 300, height: 40, borderWidth: 2, borderColor: '#e67e22', marginBottom: 10, paddingHorizontal: 10, backgroundColor: "#fff9c4", color: "#e67e22" }}
        placeholder="Exam Date (dd/mm/yyyy)"
        value={examDate}
        onChangeText={(text) => {
          setExamDate(text);
          setDateError("");
        }}
      />
      {dateError ? <Text style={{ color: 'red', marginBottom: 10 }}>{dateError}</Text> : null}
      <TouchableOpacity onPress={() => setdiffModalVisible(true)}>
        <Text style={{ color: "green", marginBottom: 10 }}>Select Difficulty: {difficulty}</Text>
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
        <Text style={{ color: "#f39c12", marginBottom: 10 }}>Select Pet Type: {type}</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={typeModalVisible}
        onRequestClose={() => settypeModalVisible(false)}
      >
        <View style={{ marginTop: 100, marginLeft: 20, marginRight: 20, backgroundColor: '#fff9c4', padding: 20 }}>
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

      <Button title="Create Pet" onPress={createNewPet} color="#841584" />
    </View>
  );
};

export default CreatePetScreen;
